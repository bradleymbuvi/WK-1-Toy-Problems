
calculateNetSalary(58000, 70000);

function calculateNetSalary(basicSalary, benefits) {
    // Constants for tax brackets and rates
    const TAX_BRACKETS = [
      { min: 0, max: 24000, rate: 0.1 },
      { min: 24001, max: 32333, rate: 0.25 },
      { min: 32334, max: 500000, rate: 0.3 },
      { min: 500001, max: 800000, rate: 0.325 },
      { min: 800001, max: Infinity, rate: 0.35 }
    ];
  
    const NHIF_RATE = 0.015; // 1.5% 'I use constant rate to avoid duplicity'
    const NSSF_RATE = 0.06; // 6%
  
    // Calculate gross salary
    const grossSalary = basicSalary + benefits;
  
    // Calculate tax (PAYEE)
    let tax = 0;
    let taxableIncome = grossSalary - 24000; // Assuming a tax-free portion of 24,000
  
    for (const bracket of TAX_BRACKETS) {
      if (taxableIncome <= 0) {
        break;
      }
  
      const bracketMax = Math.min(bracket.max, taxableIncome);
      tax += (bracketMax - bracket.min + 1) * bracket.rate;
      taxableIncome -= (bracketMax - bracket.min + 1);
    }
  
    // Calculate NHIF and NSSF deductions
    const NHIF = grossSalary * NHIF_RATE;
    const NSSF = grossSalary * NSSF_RATE;
  
    // Calculate net salary
    const netSalary = grossSalary - tax - NHIF - NSSF;
  
    return {
      grossSalary,
      tax,
      NHIF,
      NSSF,
      netSalary
    };
  }
  

  
  const salaryDetails = calculateNetSalary(basicSalary, benefits);
  console.log("Gross Salary:", salaryDetails.grossSalary);
  console.log("Tax (PAYEE):", salaryDetails.tax);
  console.log("NHIF Deductions:", salaryDetails.NHIF);
  console.log("NSSF Deductions:", salaryDetails.NSSF);
  console.log("Net Salary:", salaryDetails.netSalary);