const xlsx = require("xlsx");
const Expense = require ("../models/expense")


function decodeEntities(str) {
    if (!str) return str;
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

//import foreign bank csv expenses
exports.importExpensesFromCSV = async (req, res) => {
    const userId = req.user.id;

    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        
        const csvText = req.file.buffer.toString("utf8").replace(/^\uFEFF/, "");
        const lines = csvText.split(/\r?\n/);
        const headerIndex = lines.findIndex((line) =>
            line.replace(/"/g, "").trim().startsWith("Date,")
        );

        if (headerIndex === -1) {
            return res.status(400).json({ message: "Couldn't find a valid header row in this CSV" });
        }

        const dataText = lines.slice(headerIndex).join("\n");
        const workbook = xlsx.read(dataText, { type: "string" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        // raw: false keeps dates as readable text instead of Excel serial numbers
        const rows = xlsx.utils.sheet_to_json(sheet, { defval: "", raw: false });

        if (!rows.length) {
            return res.status(400).json({ message: "CSV file is empty or unreadable" });
        }

        const newExpenses = [];
        let skipped = 0;

        for (const row of rows) {
            const rawDate = row["Date"];
            const amount = parseFloat(row["Amount"]);
            const description = decodeEntities(row["Transaction Description"]) || "Imported transaction";
            const transactionType = row["Transaction Type"] || "Imported";

            
            if (!rawDate || isNaN(amount) || amount >= 0) {
                skipped++;
                continue;
            }

            const parsedDate = new Date(rawDate);
            if (isNaN(parsedDate.getTime())) {
                skipped++;
                continue;
            }

            newExpenses.push({
                userId,
                icon: "🧾",
                category: transactionType,  
                amount: Math.abs(amount),
                date: parsedDate,
                description,
            });
        }

        if (!newExpenses.length) {
            return res.status(400).json({ message: "No valid expense rows found in this CSV" });
        }

        const inserted = await Expense.insertMany(newExpenses);

        res.status(200).json({
            message: "CSV imported successfully",
            imported: inserted.length,
            skipped,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error while importing CSV" });
    }
};


//add expense source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try{
        const {icon, category, amount, date}=req.body;

        //validation
        if (!category || !amount || !date) {
            return res.status(400).json({message: "All fields are required"});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date (date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error){
        res.status(500).json({message: "Server Error"});
    
    }
}


//add getAllExpense source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const expense = await Expense.find({ userId }).sort({date:-1});
        res.json(expense);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

//delete expense source
exports.deleteExpense = async (req, res) => {

    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.json({message: "Expense Deleted Successfully"});

    } catch (error) {
        res.status(500).json({message: "server error"});
    }
}

//download excel 
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try{
        const expense = await Expense.find({userId}).sort({date:-1});

        //prep data for excel
        const data = expense.map((item)=>({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }));
        
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download("expense_details.xlsx");

    } catch (error) {
        res.status(500).json({ message:"Server Error" });
    
    }
};