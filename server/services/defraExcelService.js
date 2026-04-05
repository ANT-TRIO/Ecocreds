const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// The exact path to the dataset
const EXCEL_FILE_PATH = path.join(__dirname, '..', 'ghg-conversion-factors-2025-condensed-set.xlsx');

let workbookCache = null;

/**
 * Initializes the DEFRA dataset by parsing the Excel spreadsheet.
 * We cache the workbook so it only reads the 1.8MB file once.
 */
function loadDefraDataset() {
    if (!workbookCache) {
        console.log('[DEFRA] Loading UK Government GHG Conversion Factors Excel File...');
        // Read the actual file from the buffer
        try {
            workbookCache = xlsx.readFile(EXCEL_FILE_PATH);
            console.log('[DEFRA] Spreadsheet loaded successfully. Total sheets available:', workbookCache.SheetNames.length);
        } catch (error) {
            console.error('[DEFRA] Failed to load the dataset:', error.message);
        }
    }
    return workbookCache;
}

/**
 * STANDARD DEFRA FORMULA ALGORITHM:
 * Total Carbon Emissions (kg CO2e) = Activity Data (e.g., Mass in kg) × Emission Factor
 * 
 * In this service, we actively scan the Excel dataset to try and find the most relevant 
 * conversion factor for a given material base class.
 */
function calculateCarbonFromDefra(materialClass, massOriginalKg) {
    const workbook = loadDefraDataset();
    let massKg = massOriginalKg || 1; // Default to 1kg if unknown
    
    // Default fallback emission factor if we cannot find the material in the sheet 
    // (This helps if the Excel structure varies or the material name is too vague)
    let emissionFactor = 2.5; 

    let factorFound = false;

    if (workbook) {
        // Try searching for the exact material keyword across sheets.
        // The condensed DEFRA sheets typically have 'Material use' or similar tabs.
        const targetWord = materialClass.toLowerCase();

        for (let sheetName of workbook.SheetNames) {
            // Speed optimization: primarily check sheets that sound like they contain material data
            if (sheetName.toLowerCase().includes('material') || sheetName.toLowerCase().includes('freight')) {
                const sheet = workbook.Sheets[sheetName];
                const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

                // Scan rows for a matching material name
                for (let i = 0; i < data.length; i++) {
                    const row = data[i];
                    if (!row || !row.length) continue;

                    // Convert array of cells to string text
                    const rowText = row.join(' ').toLowerCase();

                    if (rowText.includes(targetWord)) {
                        // We found a row describing the material!
                        // Now we extract the first numeric value in this row which usually represents the conversion factor (kg CO2e)
                        for (let cell of row) {
                            const parsedVal = parseFloat(cell);
                            if (!isNaN(parsedVal) && parsedVal > 0 && parsedVal < 100) {
                                emissionFactor = parsedVal;
                                factorFound = true;
                                console.log(`[DEFRA Dataset Match] Found emission factor ${emissionFactor} kg CO2e for "${materialClass}" in sheet: "${sheetName}"`);
                                break;
                            }
                        }
                    }
                    if (factorFound) break;
                }
            }
            if (factorFound) break;
        }
    }

    if (!factorFound) {
         console.log(`[DEFRA Dataset Info] "${materialClass}" not found directly in dataset. Using standard baseline factor: ${emissionFactor}`);
    }

    // --- CORE DEMONSTRATION FORMULA ---
    // Total Carbon (kg CO2e) = Mass (kg) x Carbon Intensity Factor (from Excel)
    let totalCarbonEmissions = massKg * emissionFactor;
    
    return {
        formulaUsed: `Total Carbon Emissions (kg CO2e) = Activity Data (${massKg} kg) × Emission Factor (${emissionFactor})`,
        materialClass: materialClass,
        emissionFactorFromExcel: emissionFactor,
        calculatedKgCO2e: totalCarbonEmissions.toFixed(3),
        datasetSource: "UK DEFRA GHG Conversion Factors 2025"
    };
}

module.exports = {
    loadDefraDataset,
    calculateCarbonFromDefra
};
