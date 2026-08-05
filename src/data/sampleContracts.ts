import { SampleContract } from "../types";

export const SAMPLE_CONTRACTS: SampleContract[] = [
  {
    id: "residential-lease",
    title: "Residential Lease Agreement",
    category: "Real Estate & Rent",
    iconName: "Home",
    description: "Standard apartment lease containing automatic rent escalation, security deposit forfeiture conditions, and strict guest restrictions.",
    text: `RESIDENTIAL LEASE AGREEMENT

PARTIES: This Lease Agreement ("Lease") is entered into on July 1, 2026, between Landlord: Johnathan Vance, residing at 742 Evergreen Terrace, Springfield, IL 62704 (Contact: +1-217-555-0199, Email: jvance.properties@realestatemail.com) and Tenant: Marcus Aurelius Sterling, SSN: 334-88-9102, Phone: +1-312-555-0143, Email: m.sterling@gmail.com.

PREMISES: Landlord leases to Tenant the residential property located at 1204 Pinecrest Drive, Apt 4B, Chicago, IL 60614. Rent shall be paid directly to Bank Account: Chase Bank Routing #071000013, Acct #8839201948.

1. RENT & AUTOMATIC ESCALATION: Tenant agrees to pay $2,850 per month in advance on the 1st day of each calendar month. Tenant agrees that upon the 12-month lease renewal, the monthly rent shall automatically increase by 15% per annum without requirement of prior notice from Landlord.

2. SECURITY DEPOSIT: Tenant deposits $5,700 as a Security Deposit. In the event Tenant terminates the lease prior to the 24-month mark for any reason, including job transfer, Tenant agrees to forfeit 100% of the Security Deposit as liquidated damages.

3. INDEMNIFICATION & LIABILITY: Tenant agrees to indemnify, defend, and hold harmless Landlord and Landlord's agents from any and all claims, damages, liabilities, lawsuits, and attorney fees arising out of or related to Tenant's use of the Premises, regardless of fault or Landlord's negligence.

4. GUEST & OCCUPANCY RESTRICTIONS: No overnight guests are permitted to stay on the Premises for more than two consecutive nights without prior written consent of Landlord. Any unauthorized guest staying beyond 48 hours shall incur a penalty fee of $150 per night.

5. GOVERNING LAW: This agreement shall be governed by the laws of the State of Illinois.`
  },
  {
    id: "commercial-lease",
    title: "Commercial Retail Storefront Lease",
    category: "Real Estate & Rent",
    iconName: "Building2",
    description: "Triple Net (NNN) commercial lease with uncapped common area maintenance charges and personal guarantor liability.",
    text: `COMMERCIAL TRIPLE NET (NNN) LEASE AGREEMENT

PARTIES: Apex Retail Properties LLC ("Landlord"), represented by Managing Member David Ross, Tax ID: 99-8812039, and TechBoutique Retail Inc. ("Tenant"), represented by CEO Lisa Chen.

PREMISES: Commercial storefront Unit 102 located at 450 Market Street, San Francisco, CA 94105.

1. BASE RENT & TRIPLE NET CHARGES: Tenant shall pay Base Monthly Rent of $8,500. In addition to Base Rent, Tenant agrees to pay 100% of property taxes, building insurance premiums, and Common Area Maintenance (CAM) operating expenses. CAM charges are calculated monthly with no annual cap.

2. PERSONAL GUARANTY: The obligation to pay rent and perform covenants under this Lease is unconditionally and personally guaranteed by Lisa Chen individually. Landlord may seek recourse directly against Guarantor's personal assets without prior exhaustion of remedies against Tenant.

3. ALTERATIONS & FIXTURES: Any interior tenant improvements or structural alterations installed by Tenant shall immediately become the sole property of Landlord upon installation, without compensation to Tenant.

4. EARLY TERMINATION & ACCELERATED RENT: If Tenant defaults on rent payments for more than 10 calendar days, Landlord may terminate the Lease and immediately declare all remaining rent due over the remainder of the 5-year lease term as immediately due and payable.`
  },
  {
    id: "tech-job-offer",
    title: "Senior Engineer Employment Offer",
    category: "Employment & HR",
    iconName: "Briefcase",
    description: "Job offer letter featuring strict 24-month non-compete, broad off-hours IP assignment, and short notice termination.",
    text: `CONFIDENTIAL EMPLOYMENT AGREEMENT & JOB OFFER

EMPLOYER: Apex Global Technologies LLC, 500 Market Street, Suite 1200, San Francisco, CA 94105.
EMPLOYEE: Dr. Elena Rostova, Tax ID / SSN: 412-99-0021, Address: 88 California St, San Francisco, CA 94111, Email: elena.rostova@techmail.io, Phone: +1-415-555-8822.

POSITION & COMPENSATION: Employee is hired for the role of Principal AI Architect at a base salary of $195,000 per annum, payable bi-weekly. Direct Deposit Routing #121000358, Acct #4490128491.

1. INTELLECTUAL PROPERTY & INVENTIONS ASSIGNMENT: Employee acknowledges and agrees that all inventions, software code, algorithm improvements, trade secrets, patents, and copyrightable works created, conceived, or reduced to practice by Employee during the term of employment—whether created during standard business hours or on personal time using personal equipment—shall belong exclusively and perpetually to Apex Global Technologies LLC as a 'work made for hire'.

2. POST-EMPLOYMENT RESTRICTIVE COVENANT (NON-COMPETE): For a period of 24 months immediately following the termination of employment for any reason, Employee agrees not to directly or indirectly work for, consult with, advise, or hold equity in any business operating within the software, AI, or technology sector within a 100-mile geographic radius of Employer's offices.

3. AT-WILL TERMINATION & NOTICE PERIOD: Employment is at-will. Employer reserves the right to terminate Employee's employment at any time with or without cause by providing 7 days written notice. Employee agrees to provide 60 days advance written notice prior to resignation, during which time Employer may place Employee on unpaid garden leave.

4. BINDING ARBITRATION & CLASS ACTION WAIVER: Any legal dispute arising out of this Employment Agreement shall be settled exclusively through private binding arbitration in Wilmington, Delaware. Employee waives all rights to participate in class action lawsuits.`
  },
  {
    id: "contractor-agreement",
    title: "Independent Contractor Consulting Agreement",
    category: "Employment & HR",
    iconName: "UserCheck",
    description: "Freelance consulting contract with net-90 payment terms, strict non-solicitation of clients, and unilateral indemnity.",
    text: `INDEPENDENT CONTRACTOR SERVICES AGREEMENT

PARTIES: CloudScale Solutions Inc. ("Client") and Nova Design Studio LLC ("Contractor"), represented by Lead Consultant Alex Morgan, EIN: 45-8910239.

1. SERVICES & SCOPE OF WORK: Contractor shall deliver UI/UX design mockups and frontend software code for Client's enterprise web application as outlined in Schedule A.

2. COMPENSATION & NET-90 PAYMENT TERMS: Client shall pay Contractor $120 per hour. Contractor shall submit monthly invoices. Invoices shall be payable by Client within ninety (90) calendar days of invoice receipt ("Net-90"). No interest or late fees shall accrue during this 90-day period.

3. NON-SOLICITATION & CLIENT RESTRICTION: Contractor agrees that during the term of this Agreement and for three (3) years thereafter, Contractor shall not solicit, contact, or service any client, customer, or business partner of Client that Contractor interacted with during the engagement.

4. INDEMNIFICATION BY CONTRACTOR: Contractor shall defend, indemnify, and hold harmless Client against any claims, damages, liabilities, or expenses (including legal fees) arising from Contractor's services, alleged infringement of intellectual property, or breach of confidentiality.`
  },
  {
    id: "software-nda",
    title: "Mutual Software & Tech NDA",
    category: "Corporate & IP",
    iconName: "FileLock",
    description: "Non-Disclosure Agreement with perpetual confidentiality obligations, unilateral liability cap, and broad trade secret definitions.",
    text: `MUTUAL NON-DISCLOSURE AND PROPRIETARY INFORMATION AGREEMENT

This Agreement is made on August 15, 2026, by and between Nexus Cybernetics Inc. ("Disclosing Party"), represented by CEO Arthur Pendelton (Email: arthur@nexuscyber.com, Phone: +1-202-555-0188), and Client: Horizon Health Systems LLC, represented by Director Sarah Jenkins, EIN: 12-3456789.

1. CONFIDENTIAL INFORMATION: Confidential Information includes all proprietary software source code, AI model architecture weights, customer lists, financial statements, clinical data, and business strategy.

2. DURATION OF CONFIDENTIALITY: Receiving Party's duty to maintain secrecy of Confidential Information shall survive indefinitely and perpetually from the date of disclosure.

3. LIMITATION OF LIABILITY & UNLIMITED INDEMNIFICATION: Disclosing Party's total aggregate liability under this agreement shall be strictly capped at $1,000. However, Receiving Party agrees to indemnify, defend, and hold harmless Disclosing Party from any losses, legal expenses, or Third-Party claims with NO cap on damages or liability.

4. NO PUBLICITY: Neither party may issue press releases, marketing collateral, or mention the existence of this business relationship without express written authorization.`
  },
  {
    id: "ip-assignment",
    title: "Software & IP Invention Assignment",
    category: "Corporate & IP",
    iconName: "FileCode",
    description: "Proprietary code assignment agreement transferring all past and future software inventions with irrevocable power of attorney.",
    text: `INTELLECTUAL PROPERTY ASSIGNMENT AND TRANSFER AGREEMENT

TRANSFEROR: Developer Kevin V. Wright, SSN: 219-00-4491, Address: 104 Willow Way, Austin, TX 78701.
TRANSFEREE: Veloce Systems Corp, 100 Congress Ave, Austin, TX 78701.

1. ASSIGNMENT OF INVENTIONS: Transferor hereby irrevocably sells, assigns, transfers, and conveys to Transferee all worldwide rights, title, and interest in and to all software source code, algorithms, patent disclosures, trade secrets, and documentation created or developed prior to or during Transferor's engagement.

2. POWER OF ATTORNEY: Transferor appoints Transferee as Transferor's attorney-in-fact with full power of substitution to execute and file patent applications, copyright registrations, and legal transfers in Transferor's name should Transferor fail or refuse to do so within 5 days of request.

3. REPRESENTATIONS & WARRANTIES: Transferor warrants that all assigned IP is original, free from liens or third-party open source copyleft licensing restrictions (e.g. GPL v3), and does not infringe any third-party rights.`
  },
  {
    id: "saas-terms",
    title: "Enterprise SaaS Terms of Service & SLA",
    category: "Tech & SaaS",
    iconName: "Code2",
    description: "B2B SaaS Terms featuring auto-renewal subscriptions, mandatory unilateral price updates, and strict data use rights.",
    text: `ENTERPRISE SOFTWARE-AS-A-SERVICE (SaaS) AGREEMENT

PROVIDER: CloudMetrics AI Engine Inc., 300 Montgomery St, San Francisco, CA 94104.
SUBSCRIBER: Pinnacle Financial Group LLC, Account ID: PMG-99201.

1. SUBSCRIPTION TERM & AUTOMATIC RENEWAL: Subscriber agrees to an initial 36-month subscription term at $4,500/month. Subscription shall automatically renew for successive 12-month periods unless Subscriber provides written cancellation notice via certified mail at least 90 days prior to the end of the current term.

2. PRICE ADJUSTMENTS: Provider reserves the right to increase monthly subscription fees by up to 20% upon each annual renewal term by posting updated rates in the billing portal 30 days prior.

3. SERVICE LEVEL AGREEMENT (SLA) & CREDITS: Provider targets 99.5% service uptime. In the event uptime falls below 99.0%, Subscriber's sole and exclusive remedy shall be a 5% credit toward the following month's subscription fee. Subscriber waives any claim to monetary refunds or consequential damages resulting from platform downtime or data unavailability.

4. DATA DERIVATIVE RIGHTS: Provider is granted a non-exclusive, worldwide, royalty-free license to anonymize and aggregate Subscriber's transaction data to train Provider's machine learning models and improve commercial products.`
  },
  {
    id: "promissory-note",
    title: "Commercial Promissory Note & Loan",
    category: "Finance & Business",
    iconName: "DollarSign",
    description: "Commercial loan note with default interest penalty rate of 24%, acceleration upon technical breach, and confession of judgment.",
    text: `COMMERCIAL PROMISSORY NOTE & LOAN AGREEMENT

BORROWER: Vanguard Freight Logistics Inc., EIN: 88-1239841.
LENDER: Capital Investment Fund LP, 50 Wall Street, New York, NY 10005.
PRINCIPAL AMOUNT: $250,000 USD.

1. REPAYMENT & INTEREST: Borrower promises to pay Lender the principal sum of $250,000 together with simple interest accrued at the rate of 12% per annum in equal monthly installments of $7,500 due on the 1st day of each month.

2. DEFAULT INTEREST & ACCELERATION: In the event any installment is late by more than five (5) business days, the interest rate shall automatically increase to the maximum legal penalty rate of 24% per annum ("Default Interest Rate"). Upon any default, Lender may declare the entire unpaid principal balance immediately due and payable.

3. CONFESSION OF JUDGMENT: Borrower irrevocably authorizes any attorney of record to appear for Borrower in any court of competent jurisdiction after default and confess judgment against Borrower for the full unpaid amount plus 15% attorney fees without prior notice or trial.

4. COLLATERAL & LIEN: This Note is secured by a first-priority UCC-1 blanket lien on all of Borrower's inventory, equipment, accounts receivable, and bank deposits.`
  }
];
