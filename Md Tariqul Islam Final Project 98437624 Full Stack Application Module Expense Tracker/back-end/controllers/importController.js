const xlsx = require("xlsx");
const Expense = require("../models/expense");
const Income = require("../models/income");

function decodeEntities(str) {
    if (!str) return str;
    return str
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
}

// import both expenses and income from a Chase (UK) CSV export
exports.importTransactionsFromCSV = async (req, res) => {
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
        const rows = xlsx.utils.sheet_to_json(sheet, { defval: "", raw: false });

        if (!rows.length) {
            return res.status(400).json({ message: "CSV file is empty or unreadable" });
        }

        const newExpenses = [];
        const newIncomes = [];
        let skipped = 0;

        for (const row of rows) {
            const rawDate = row["Date"];
            const amount = parseFloat(row["Amount"]);
            const description = decodeEntities(row["Transaction Description"]) || "Imported transaction";
            const transactionType = row["Transaction Type"] || "Imported";

            if (!rawDate || isNaN(amount) || amount === 0) {
                skipped++;
                continue;
            }

            const parsedDate = new Date(rawDate);
            if (isNaN(parsedDate.getTime())) {
                skipped++;
                continue;
            }

            if (amount < 0) {
                newExpenses.push({
                    userId,
                    icon: "🧾",
                    category: description,
                    amount: Math.abs(amount),
                    date: parsedDate,
                    description,
                });
            } else {
                newIncomes.push({
                    userId,
                    icon: "💷",
                    source: description,
                    amount,
                    date: parsedDate,
                });
            }
        }

        const insertedExpenses = newExpenses.length ? await Expense.insertMany(newExpenses) : [];
        const insertedIncomes = newIncomes.length ? await Income.insertMany(newIncomes) : [];

        if (!insertedExpenses.length && !insertedIncomes.length) {
            return res.status(400).json({ message: "No valid transactions found in this CSV" });
        }

        res.status(200).json({
            message: "CSV imported successfully",
            importedExpenses: insertedExpenses.length,
            importedIncomes: insertedIncomes.length,
            skipped,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error while importing CSV" });
    }
};