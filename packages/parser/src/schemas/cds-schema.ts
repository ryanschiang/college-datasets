import z from "zod/v3";

export const cdsSchema = z.object({
  // A0
  cds_corresponding_web_page: z.string().optional().describe("A0: If yes, please provide the URL of the corresponding Web page"),

  // A1
  address_information: z
    .object({
      // TODO:
      name_of_college_university: z.string().optional().describe("A1: Name of College/University"),
      mailing_address: z.string().optional().describe("A1: Mailing Address"),
      mailing_address_city_state_zip_country: z.string().optional().describe("A1: Mailing Address | City/State/Zip/Country"),
      street_address: z.string().optional().describe("A1: Street Address (if different)"),
      street_address_city_state_zip_country: z.string().optional().describe("A1: Street Address (if different) | City/State/Zip/Country"),
      main_phone_number: z.string().optional().describe("A1: Main Phone Number"),
      www_home_page_address: z.string().optional().describe("A1: WWW Home Page Address"),
      admissions_phone_number: z.string().optional().describe("A1: Admissions Phone Number"),
      admissions_toll_free_phone_number: z.string().optional().describe("A1: Admissions Toll-Free Phone Number"),
      admissions_office_mailing_address: z.string().optional().describe("A1: Admissions Office Mailing Address"),
      admissions_office_mailing_address_city_state_zip_country: z.string().optional().describe("A1: Admissions Office Mailing Address | City/State/Zip/Country"),
      admissions_email_address: z.string().optional().describe("A1: Admissions E-mail Address"),
      url_for_online_application: z.string().optional().describe("A1: If there is a separate URL for your school's online application, please specify:"),
    })
    .describe("A1: Address Information"),

  // A2
  source_of_institutional_control: z.enum(["public", "private", "proprietary"]).describe("A2: Source of institutional control"),
  // A3
  undergraduate_institution_classification: z.enum(["coed", "mens", "womens"]).describe("A3: Classify your undergraduate institution"),
  // A4
  academic_year_calendar: z.enum(["semester", "quarter", "trimester", "4-1-4", "continuous", "differs_by_program", "other"]).describe("A4: Academic year calendar"),
  // A5
  degrees_offered: z
    .array(
      z.enum([
        "certificate",
        "diploma",
        "associate",
        "transfer_associate",
        "terminal_associate",
        "bachelors",
        "postbachelors_certificate",
        "masters",
        "postmasters_certificate",
        "doctoral_degree_research_scholarship",
        "doctoral_degree_professional_practice",
        "doctoral_degree_other",
      ]),
    )
    .describe("A5: Degrees offered by your institution"),
  // A6
  diversity_equity_inclusion_url: z.string().optional().describe("A6: If you have a diversity, equity, and inclusion office or department, please provide the URL of the corresponding Web page"),
  // B1
  undergraduate_students_full_time: z
    .object({
      degree_seeking_first_time_first_year_men: z.number().describe("B1: Degree-seeking, first-time first-year students Men"),
      degree_seeking_first_time_first_year_women: z.number().describe("B1: Degree-seeking, first-time first-year students Women"),
      degree_seeking_first_time_first_year_another_gender: z.number().describe("B1: Degree-seeking, first-time first-year students Another Gender"),
      degree_seeking_first_time_first_year_unknown: z.number().describe("B1: Degree-seeking, first-time first-year students Unknown"),
      other_first_year_degree_seeking_men: z.number().describe("B1: Other first-year, degree-seeking Men"),
      other_first_year_degree_seeking_women: z.number().describe("B1: Other first-year, degree-seeking Women"),
      other_first_year_degree_seeking_another_gender: z.number().describe("B1: Other first-year, degree-seeking Another Gender"),
      other_first_year_degree_seeking_unknown: z.number().describe("B1: Other first-year, degree-seeking Unknown"),
      all_other_degree_seeking_men: z.number().describe("B1: All other degree-seeking Men"),
      all_other_degree_seeking_women: z.number().describe("B1: All other degree-seeking Women"),
      all_other_degree_seeking_another_gender: z.number().describe("B1: All other degree-seeking Another Gender"),
      all_other_degree_seeking_unknown: z.number().describe("B1: All other degree-seeking Unknown"),
      total_degree_seeking_men: z.number().describe("B1: Total degree-seeking Men"),
      total_degree_seeking_women: z.number().describe("B1: Total degree-seeking Women"),
      total_degree_seeking_another_gender: z.number().describe("B1: Total degree-seeking Another Gender"),
      total_degree_seeking_unknown: z.number().describe("B1: Total degree-seeking Unknown"),
      all_other_undergraduates_enrolled_in_credit_courses_men: z.number().describe("B1: All other undergraduates enrolled in credit courses Men"),
      all_other_undergraduates_enrolled_in_credit_courses_women: z.number().describe("B1: All other undergraduates enrolled in credit courses Women"),
      all_other_undergraduates_enrolled_in_credit_courses_another_gender: z.number().describe("B1: All other undergraduates enrolled in credit courses Another Gender"),
      all_other_undergraduates_enrolled_in_credit_courses_unknown: z.number().describe("B1: All other undergraduates enrolled in credit courses Unknown"),
      total_undergraduate_full_time_students_men: z.number().describe("B1: Total undergraduate Full-Time Students Men"),
      total_undergraduate_full_time_students_women: z.number().describe("B1: Total undergraduate Full-Time Students Women"),
      total_undergraduate_full_time_students_another_gender: z.number().describe("B1: Total undergraduate Full-Time Students Another Gender"),
      total_undergraduate_full_time_students_unknown: z.number().describe("B1: Total undergraduate Full-Time Students Unknown"),
    })
    .describe("B1: Undergraduate Students: Full-Time"),
  undergraduate_students_part_time: z
    .object({
      degree_seeking_first_time_first_year_men: z.number().describe("B1: Degree-seeking, first-time first-year students Men"),
      degree_seeking_first_time_first_year_women: z.number().describe("B1: Degree-seeking, first-time first-year students Women"),
      degree_seeking_first_time_first_year_another_gender: z.number().describe("B1: Degree-seeking, first-time first-year students Another Gender"),
      degree_seeking_first_time_first_year_unknown: z.number().describe("B1: Degree-seeking, first-time first-year students Unknown"),
      other_first_year_degree_seeking_men: z.number().describe("B1: Other first-year, degree-seeking Men"),
      other_first_year_degree_seeking_women: z.number().describe("B1: Other first-year, degree-seeking Women"),
      other_first_year_degree_seeking_another_gender: z.number().describe("B1: Other first-year, degree-seeking Another Gender"),
      other_first_year_degree_seeking_unknown: z.number().describe("B1: Other first-year, degree-seeking Unknown"),
      all_other_degree_seeking_men: z.number().describe("B1: All other degree-seeking Men"),
      all_other_degree_seeking_women: z.number().describe("B1: All other degree-seeking Women"),
      all_other_degree_seeking_another_gender: z.number().describe("B1: All other degree-seeking Another Gender"),
      all_other_degree_seeking_unknown: z.number().describe("B1: All other degree-seeking Unknown"),
      total_degree_seeking_men: z.number().describe("B1: Total degree-seeking Men"),
      total_degree_seeking_women: z.number().describe("B1: Total degree-seeking Women"),
      total_degree_seeking_another_gender: z.number().describe("B1: Total degree-seeking Another Gender"),
      total_degree_seeking_unknown: z.number().describe("B1: Total degree-seeking Unknown"),
      all_other_undergraduates_enrolled_in_credit_courses_men: z.number().describe("B1: All other undergraduates enrolled in credit courses Men"),
      all_other_undergraduates_enrolled_in_credit_courses_women: z.number().describe("B1: All other undergraduates enrolled in credit courses Women"),
      all_other_undergraduates_enrolled_in_credit_courses_another_gender: z.number().describe("B1: All other undergraduates enrolled in credit courses Another Gender"),
      all_other_undergraduates_enrolled_in_credit_courses_unknown: z.number().describe("B1: All other undergraduates enrolled in credit courses Unknown"),
      total_undergraduate_part_time_students_men: z.number().describe("B1: Total undergraduate Part-Time Students Men"),
      total_undergraduate_part_time_students_women: z.number().describe("B1: Total undergraduate Part-Time Students Women"),
      total_undergraduate_part_time_students_another_gender: z.number().describe("B1: Total undergraduate Part-Time Students Another Gender"),
      total_undergraduate_part_time_students_unknown: z.number().describe("B1: Total undergraduate Part-Time Students Unknown"),
    })
    .describe("B1: Undergraduate Students: Part-Time"),
  undergraduate_students_all: z
    .object({
      total_undergraduate_students_men: z.number().describe("B1: Total undergraduate Students Men"),
      total_undergraduate_students_women: z.number().describe("B1: Total undergraduate Students Women"),
      total_undergraduate_students_another_gender: z.number().describe("B1: Total undergraduate Students Another Gender"),
      total_undergraduate_students_unknown: z.number().describe("B1: Total undergraduate Students Unknown"),
    })
    .describe("B1: Undergraduate Students: All"),
  graduate_students_full_time: z
    .object({
      degree_seeking_first_time_men: z.number().describe("B1: Degree-seeking, first-time Men"),
      degree_seeking_first_time_women: z.number().describe("B1: Degree-seeking, first-time Women"),
      degree_seeking_first_time_another_gender: z.number().describe("B1: Degree-seeking, first-time Another Gender"),
      degree_seeking_first_time_unknown: z.number().describe("B1: Degree-seeking, first-time Unknown"),
      all_other_degree_seeking_men: z.number().describe("B1: All other degree-seeking Men"),
      all_other_degree_seeking_women: z.number().describe("B1: All other degree-seeking Women"),
      all_other_degree_seeking_another_gender: z.number().describe("B1: All other degree-seeking Another Gender"),
      all_other_degree_seeking_unknown: z.number().describe("B1: All other degree-seeking Unknown"),
      all_other_graduates_enrolled_in_credit_courses_men: z.number().describe("B1: All other graduates enrolled in credit courses Men"),
      all_other_graduates_enrolled_in_credit_courses_women: z.number().describe("B1: All other graduates enrolled in credit courses Women"),
      all_other_graduates_enrolled_in_credit_courses_another_gender: z.number().describe("B1: All other graduates enrolled in credit courses Another Gender"),
      all_other_graduates_enrolled_in_credit_courses_unknown: z.number().describe("B1: All other graduates enrolled in credit courses Unknown"),
      total_graduate_full_time_students_men: z.number().describe("B1: Total graduate Full-Time Students Men"),
      total_graduate_full_time_students_women: z.number().describe("B1: Total graduate Full-Time Students Women"),
      total_graduate_full_time_students_another_gender: z.number().describe("B1: Total graduate Full-Time Students Another Gender"),
      total_graduate_full_time_students_unknown: z.number().describe("B1: Total graduate Full-Time Students Unknown"),
    })
    .describe("B1: Graduate Students: Full-Time"),
  graduate_students_part_time: z
    .object({
      degree_seeking_first_time_men: z.number().describe("B1: Degree-seeking, first-time Men"),
      degree_seeking_first_time_women: z.number().describe("B1: Degree-seeking, first-time Women"),
      degree_seeking_first_time_another_gender: z.number().describe("B1: Degree-seeking, first-time Another Gender"),
      degree_seeking_first_time_unknown: z.number().describe("B1: Degree-seeking, first-time Unknown"),
      all_other_degree_seeking_men: z.number().describe("B1: All other degree-seeking Men"),
      all_other_degree_seeking_women: z.number().describe("B1: All other degree-seeking Women"),
      all_other_degree_seeking_another_gender: z.number().describe("B1: All other degree-seeking Another Gender"),
      all_other_degree_seeking_unknown: z.number().describe("B1: All other degree-seeking Unknown"),
      all_other_graduates_enrolled_in_credit_courses_men: z.number().describe("B1: All other graduates enrolled in credit courses Men"),
      all_other_graduates_enrolled_in_credit_courses_women: z.number().describe("B1: All other graduates enrolled in credit courses Women"),
      all_other_graduates_enrolled_in_credit_courses_another_gender: z.number().describe("B1: All other graduates enrolled in credit courses Another Gender"),
      all_other_graduates_enrolled_in_credit_courses_unknown: z.number().describe("B1: All other graduates enrolled in credit courses Unknown"),
      total_graduate_part_time_students_men: z.number().describe("B1: Total graduate Part-Time Students Men"),
      total_graduate_part_time_students_women: z.number().describe("B1: Total graduate Part-Time Students Women"),
      total_graduate_part_time_students_another_gender: z.number().describe("B1: Total graduate Part-Time Students Another Gender"),
      total_graduate_part_time_students_unknown: z.number().describe("B1: Total graduate Part-Time Students Unknown"),
    })
    .describe("B1: Graduate Students: Part-Time"),
  graduate_students_all: z
    .object({
      total_graduate_students_men: z.number().describe("B1: Total Graduate Students Men"),
      total_graduate_students_women: z.number().describe("B1: Total Graduate Students Women"),
      total_graduate_students_another_gender: z.number().describe("B1: Total Graduate Students Another Gender"),
      total_graduate_students_unknown: z.number().describe("B1: Total Graduate Students Unknown"),
    })
    .describe("B1: Graduate Students: All"),
  all_students_total: z
    .object({
      total_all_students_men: z.number().describe("B1: Total all students Men"),
      total_all_students_women: z.number().describe("B1: Total all students Women"),
      total_all_students_another_gender: z.number().describe("B1: Total all students Another Gender"),
      total_all_students_unknown: z.number().describe("B1: Total all students Unknown"),
    })
    .describe("B1: All Students: Total"),
  total_all_undergraduates: z.number().describe("B1: Total all undergraduates"),
  total_all_graduate: z.number().describe("B1: Total all graduate"),
  grand_total_all_students: z.number().describe("B1: GRAND TOTAL ALL STUDENTS"),
  // B2
  enrollment_by_racial_ethnic_category: z
    .object({
      nonresidents_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Nonresidents"),
      nonresidents_degree_seeking_undergraduates_includes_first_time_first_year: z.number().describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Nonresidents"),
      nonresidents_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Nonresidents"),
      hispanic_latino_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Hispanic/Latino"),
      hispanic_latino_degree_seeking_undergraduates_includes_first_time_first_year: z.number().describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Hispanic/Latino"),
      hispanic_latino_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Hispanic/Latino"),
      black_african_american_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Black or African American, non-Hispanic"),
      black_african_american_degree_seeking_undergraduates_includes_first_time_first_year: z.number().describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Black or African American, non-Hispanic"),
      black_african_american_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Black or African American, non-Hispanic"),
      white_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year White, non-Hispanic"),
      white_degree_seeking_undergraduates_includes_first_time_first_year: z.number().describe("B2: Degree-Seeking Undergraduates (include first-time first-year) White, non-Hispanic"),
      white_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) White, non-Hispanic"),
      american_indian_alaska_native_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year American Indian or Alaska Native, non-Hispanic"),
      american_indian_alaska_native_degree_seeking_undergraduates_includes_first_time_first_year: z.number().describe("B2: Degree-Seeking Undergraduates (include first-time first-year) American Indian or Alaska Native, non-Hispanic"),
      american_indian_alaska_native_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) American Indian or Alaska Native, non-Hispanic"),
      asian_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Asian, non-Hispanic"),
      asian_degree_seeking_undergraduates_includes_first_time_first_year: z.number().describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Asian, non-Hispanic"),
      asian_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Asian, non-Hispanic"),
      native_hawaiian_pacific_islander_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Native Hawaiian or other Pacific Islander, non-Hispanic"),
      native_hawaiian_pacific_islander_degree_seeking_undergraduates_includes_first_time_first_year: z
        .number()
        .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Native Hawaiian or other Pacific Islander, non-Hispanic"),
      native_hawaiian_pacific_islander_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Native Hawaiian or other Pacific Islander, non-Hispanic"),
      two_or_more_races_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Two or more races, non-Hispanic"),
      two_or_more_races_degree_seeking_undergraduates_includes_first_time_first_year: z.number().describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Two or more races, non-Hispanic"),
      two_or_more_races_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Two or more races, non-Hispanic"),
      race_ethnicity_unknown_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Race and/or ethnicity unknown"),
      race_ethnicity_unknown_degree_seeking_undergraduates_includes_first_time_first_year: z.number().describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Race and/or ethnicity unknown"),
      race_ethnicity_unknown_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Race and/or ethnicity unknown"),
      total_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year TOTAL"),
      total_degree_seeking_undergraduates_includes_first_time_first_year: z.number().describe("B2: Degree-Seeking Undergraduates (include first-time first-year) TOTAL"),
      total_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) TOTAL"),
    })
    .describe("B2: Enrollment by Racial/Ethnic Category"),
  // B3
  number_of_degrees_awarded: z
    .object({
      certificate_diploma: z.number().describe("B3: Certificate/diploma"),
      associate_degrees: z.number().describe("B3: Associate degrees"),
      bachelors_degrees: z.number().describe("B3: Bachelor's degrees"),
      postbachelors_certificates: z.number().describe("B3: Postbachelor's certificates"),
      masters_degrees: z.number().describe("B3: Master's degrees"),
      postmasters_certificates: z.number().describe("B3: Post-Master's certificates"),
      doctoral_degrees_research_scholarship: z.number().describe("B3: Doctoral degrees — research/scholarship"),
      doctoral_degrees_professional_practice: z.number().describe("B3: Doctoral degrees — professional practice"),
      doctoral_degrees_other: z.number().describe("B3: Doctoral degrees — other"),
      start_date: z.string().describe("B3: Start date, e.g. July 1, 2023"),
      end_date: z.string().describe("B3: End date, e.g. June 30, 2024"),
    })
    .describe("B3: Number of degrees awarded by your institution from [start_date] to [end_date]."),
  // B4
  graduation_rates: z
    .object({
      initial_cohort_recipients_federal_pell_grant: z.number().optional().describe("B4: Initial [year] cohort of first-time, full-time bachelor's (or equivalent) degree-seeking undergraduate students | Recipients of a Federal Pell Grant"),
      initial_cohort_recipients_stafford_loan: z
        .number()
        .optional()
        .describe("B4: Initial [year] cohort of first-time, full-time bachelor's (or equivalent) degree-seeking undergraduate students | Recipients of a Subsidized Stafford Loan who did not receive a Pell Grant"),
      initial_cohort_recipients_not_receiving_any_federal_loans: z
        .number()
        .optional()
        .describe("B4: Initial [year] cohort of first-time, full-time bachelor's (or equivalent) degree-seeking undergraduate students | Students who did not receive either a Pell Grant or a subsidized Stafford Loan"),
      initial_cohort_recipients_total: z
        .number()
        .optional()
        .describe("B4: Initial [year] cohort of first-time, full-time bachelor's (or equivalent) degree-seeking undergraduate students | Students who did not receive either a Pell Grant or a subsidized Stafford Loan"),
      allowable_exclusions_federal_pell_grant: z
        .number()
        .optional()
        .describe(
          "B4: Of the initial [year] cohort, how many did not persist and did not graduate for the following reasons: Deceased, Permanently Disabled, Armed Forces, Foreign Aid Service of the Federal Government, Official church missions (Report Total Allowable Exclusions) | Recipients of a Federal Pell Grant",
        ),
      allowable_exclusions_stafford_loan: z
        .number()
        .optional()
        .describe(
          "B4: Of the initial [year] cohort, how many did not persist and did not graduate for the following reasons: Deceased, Permanently Disabled, Armed Forces, Foreign Aid Service of the Federal Government, Official church missions (Report Total Allowable Exclusions) | Recipients of a Subsidized Stafford Loan who did not receive a Pell Grant",
        ),
      allowable_exclusions_not_receiving_any_federal_loans: z
        .number()
        .optional()
        .describe(
          "B4: Of the initial [year] cohort, how many did not persist and did not graduate for the following reasons: Deceased, Permanently Disabled, Armed Forces, Foreign Aid Service of the Federal Government, Official church missions (Report Total Allowable Exclusions) | Students who did not receive either a Pell Grant or a subsidized Stafford Loan",
        ),
      allowable_exclusions_total: z
        .number()
        .optional()
        .describe(
          "B4: Of the initial [year] cohort, how many did not persist and did not graduate for the following reasons: Deceased, Permanently Disabled, Armed Forces, Foreign Aid Service of the Federal Government, Official church missions (Report Total Allowable Exclusions) | Total",
        ),
      final_cohort_after_exclusions_federal_pell_grant: z.number().optional().describe("B4: Final [year] cohort, after adjusting for allowable exclusions | Recipients of a Federal Pell Grant"),
      final_cohort_after_exclusions_stafford_loan: z.number().optional().describe("B4: Final [year] cohort, after adjusting for allowable exclusions | Recipients of a Subsidized Stafford Loan who did not receive a Pell Grant"),
      final_cohort_after_exclusions_not_receiving_any_federal_loans: z
        .number()
        .optional()
        .describe("B4: Final [year] cohort, after adjusting for allowable exclusions | Students who did not receive either a Pell Grant or a subsidized Stafford Loan"),
      final_cohort_after_exclusions_total: z.number().optional().describe("B4: Final [year] cohort, after adjusting for allowable exclusions | Total"),
      completed_in_four_years_or_less_federal_pell_grant: z.number().optional().describe("B4: Of the initial [year] cohort, how many completed the program in four years or less | Recipients of a Federal Pell Grant"),
      completed_in_four_years_or_less_stafford_loan: z
        .number()
        .optional()
        .describe("B4: Of the initial [year] cohort, how many completed the program in four years or less | Recipients of a Subsidized Stafford Loan who did not receive a Pell Grant"),
      completed_in_four_years_or_less_not_receiving_any_federal_loans: z
        .number()
        .optional()
        .describe("B4: Of the initial [year] cohort, how many completed the program in four years or less | Students who did not receive either a Pell Grant or a subsidized Stafford Loan"),
      completed_in_four_years_or_less_total: z.number().optional().describe("B4: Of the initial [year] cohort, how many completed the program in four years or less | Total"),
      completed_in_five_years_federal_pell_grant: z.number().optional().describe("B4: Of the initial [year] cohort, how many completed the program in more than four years but in five years or less | Recipients of a Federal Pell Grant"),
      completed_in_five_years_stafford_loan: z
        .number()
        .optional()
        .describe("B4: Of the initial [year] cohort, how many completed the program in more than four years but in five years or less | Recipients of a Subsidized Stafford Loan who did not receive a Pell Grant"),
      completed_in_five_years_not_receiving_any_federal_loans: z
        .number()
        .optional()
        .describe("B4: Of the initial [year] cohort, how many completed the program in more than four years but in five years or less | Students who did not receive either a Pell Grant or a subsidized Stafford Loan"),
      completed_in_five_years_total: z.number().optional().describe("B4: Of the initial [year] cohort, how many completed the program in more than four years but in five years or less | Total"),
      completed_in_six_years_federal_pell_grant: z.number().optional().describe("B4: Of the initial [year] cohort, how many completed the program in more than five years but in six years or less | Recipients of a Federal Pell Grant"),
      completed_in_six_years_stafford_loan: z
        .number()
        .optional()
        .describe("B4: Of the initial [year] cohort, how many completed the program in more than five years but in six years or less | Recipients of a Subsidized Stafford Loan who did not receive a Pell Grant"),
      completed_in_six_years_not_receiving_any_federal_loans: z
        .number()
        .optional()
        .describe("B4: Of the initial [year] cohort, how many completed the program in more than five years but in six years or less | Students who did not receive either a Pell Grant or a subsidized Stafford Loan"),
      completed_in_six_years_total: z.number().optional().describe("B4: Of the initial [year] cohort, how many completed the program in more than five years but in six years or less | Total"),
      total_graduating_within_six_years_federal_pell_grant: z.number().optional().describe("B4: Total graduating within six years (sum of lines D, E, and F) | Recipients of a Federal Pell Grant"),
      total_graduating_within_six_years_stafford_loan: z.number().optional().describe("B4: Total graduating within six years (sum of lines D, E, and F) | Recipients of a Subsidized Stafford Loan who did not receive a Pell Grant"),
      total_graduating_within_six_years_not_receiving_any_federal_loans: z
        .number()
        .optional()
        .describe("B4: Total graduating within six years (sum of lines D, E, and F) | Students who did not receive either a Pell Grant or a subsidized Stafford Loan"),
      total_graduating_within_six_years_total: z.number().optional().describe("B4: Total graduating within six years (sum of lines D, E, and F) | Total"),
      six_year_graduation_rate_federal_pell_grant: z.number().min(0).max(100).optional().describe("B4: Six-year graduation rate for [year] cohort (G divided by C) | Recipients of a Federal Pell Grant | as percent from 0% to 100%"),
      six_year_graduation_rate_stafford_loan: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("B4: Six-year graduation rate for [year] cohort (G divided by C) | Recipients of a Subsidized Stafford Loan who did not receive a Pell Grant | as percent from 0% to 100%"),
      six_year_graduation_rate_not_receiving_any_federal_loans: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("B4: Six-year graduation rate for [year] cohort (G divided by C) | Students who did not receive either a Pell Grant or a subsidized Stafford Loan | as percent from 0% to 100%"),
      six_year_graduation_rate_total: z.number().min(0).max(100).optional().describe("B4: Six-year graduation rate for [year] cohort (G divided by C) | Total | as percent from 0% to 100%"),
    })
    .describe("B4: Graduation Rates | For Bachelor's or Equivalent Programs"),
  // B22
  retainment_rate: z.number().min(0).max(100).optional().describe("B22: Calculate the percentage of the Fall 2024 entering cohort who remained enrolled on the official census date."),
  // C1
  first_time_first_year_student_applicants: z
    .object({
      total_first_time_first_year_men_who_applied: z.number().describe("C1: Total first-time, first-year men who applied"),
      total_first_time_first_year_women_who_applied: z.number().describe("C1: Total first-time, first-year women who applied"),
      total_first_time_first_year_another_gender_who_applied: z.number().describe("C1: Total first-time, first-year another gender who applied"),
      total_first_time_first_year_unknown_gender_who_applied: z.number().describe("C1: Total first-time, first-year unknown gender who applied"),
    })
    .describe("C1: First-Time, First-Year Student Applicants"),
  first_time_first_year_student_admits: z
    .object({
      total_first_time_first_year_men_who_were_admitted: z.number().describe("C1: Total first-time, first-year men who were admitted"),
      total_first_time_first_year_women_who_were_admitted: z.number().describe("C1: Total first-time, first-year women who were admitted"),
      total_first_time_first_year_another_gender_who_were_admitted: z.number().describe("C1: Total first-time, first-year another gender who were admitted"),
      total_first_time_first_year_unknown_gender_who_were_admitted: z.number().describe("C1: Total first-time, first-year unknown gender who were admitted"),
    })
    .describe("C1: First-Time, First-Year Student Admits"),
  first_time_first_year_student_enrollees_by_status: z
    .object({
      total_full_time_first_time_first_year_men_who_enrolled: z.number().describe("Total full-time, first-time, first-year men who enrolled"),
      total_part_time_first_time_first_year_men_who_enrolled: z.number().describe("Total part-time, first-time, first-year men who enrolled"),
      total_full_time_first_time_first_year_women_who_enrolled: z.number().describe("Total full-time, first-time, first-year women who enrolled"),
      total_part_time_first_time_first_year_women_who_enrolled: z.number().describe("Total part-time, first-time, first-year women who enrolled"),
      total_full_time_first_time_first_year_another_gender_who_enrolled: z.number().describe("Total full-time, first-time, first-year another gender who enrolled"),
      total_part_time_first_time_first_year_another_gender_who_enrolled: z.number().describe("Total part-time, first-time, first-year another gender who enrolled"),
      total_full_time_first_time_first_year_unknown_gender_who_enrolled: z.number().describe("Total full-time, first-time, first-year unknown gender who enrolled"),
      total_part_time_first_time_first_year_unknown_gender_who_enrolled: z.number().describe("Total part-time, first-time, first-year unknown gender who enrolled"),
    })
    .describe("C1: First-Time, First-Year Student Enrollees by Status"),
  residency_breakdowns_for_total_applicants_admits_and_enrollees: z
    .object({
      total_total_first_time_first_year_who_applied: z.number().optional().describe("C1: Total Total first-time, first-year who applied"),
      in_state_total_first_time_first_year_who_applied: z.number().optional().describe("C1: In-State Total first-time, first-year who applied"),
      out_of_state_total_first_time_first_year_who_applied: z.number().optional().describe("C1: Out-of-State Total first-time, first-year who applied"),
      international_total_first_time_first_year_who_applied: z.number().optional().describe("C1: International Total first-time, first-year who applied"),
      unknown_total_first_time_first_year_who_applied: z.number().optional().describe("C1: Unknown Total first-time, first-year who applied"),
      total_total_first_time_first_year_who_were_admitted: z.number().optional().describe("C1: Total Total first-time, first-year who were admitted"),
      in_state_total_first_time_first_year_who_were_admitted: z.number().optional().describe("C1: In-State Total first-time, first-year who were admitted"),
      out_of_state_total_first_time_first_year_who_were_admitted: z.number().optional().describe("C1: Out-of-State Total first-time, first-year who were admitted"),
      international_total_first_time_first_year_who_were_admitted: z.number().optional().describe("C1: International Total first-time, first-year who were admitted"),
      unknown_total_first_time_first_year_who_were_admitted: z.number().optional().describe("C1: Unknown Total first-time, first-year who were admitted"),
      total_total_first_time_first_year_who_enrolled: z.number().optional().describe("C1: Total Total first-time, first-year who enrolled"),
      in_state_total_first_time_first_year_who_enrolled: z.number().optional().describe("C1: In-State Total first-time, first-year who enrolled"),
      out_of_state_total_first_time_first_year_who_enrolled: z.number().optional().describe("C1: Out-of-State Total first-time, first-year who enrolled"),
      international_total_first_time_first_year_who_enrolled: z.number().optional().describe("C1: International Total first-time, first-year who enrolled"),
      unknown_total_first_time_first_year_who_enrolled: z.number().optional().describe("C1: Unknown Total first-time, first-year who enrolled"),
    })
    .describe("C1: If available, please provide residency breakdowns for total applicants, admits, and enrolled students"),
  // C2
  first_time_first_year_waitlisted_students: z
    .object({
      has_waitlist_policy: z.boolean().optional().describe("C2: Do you have a policy of placing students on a waiting list?"),
      number_of_qualified_applicants_offered_a_place_on_waiting_list: z.number().optional().describe("C2: Number of qualified applicants offered a place on waiting list"),
      number_accepting_a_place_on_the_waiting_list: z.number().optional().describe("C2: Number accepting a place on the waiting list"),
      number_of_waitlisted_students_admitted: z.number().optional().describe("C2: Number of wait-listed students admitted"),
      waitlist_is_ranked: z.boolean().optional().describe("C2: Is your waiting list ranked?"),
      waitlist_rank_released_to_students: z.boolean().optional().describe("C2: If yes, do you release that information to students?"),
      waitlist_rank_released_to_school_counselors: z.boolean().optional().describe("C2: Do you release that information to school counselors?"),
    })
    .describe("C2: First-time, first-year waitlisted students"),
  // C3
  high_school_completion_requirement: z
    .object({
      high_school_diploma_required_and_ged_is_accepted: z.boolean().optional().describe("C3: High school diploma is required and GED is accepted"),
      high_school_diploma_required_and_ged_is_not_accepted: z.boolean().optional().describe("C3: High school diploma is required and GED is not accepted"),
      high_school_diploma_or_equivalent_is_not_required: z.boolean().optional().describe("C3: High school diploma or equivalent is not required"),
    })
    .describe("C3: High school completion requirement"),
  // C4
  require_or_recommend_general_college_preparatory_program: z
    .object({
      require: z.boolean().optional().describe("C4: Require"),
      recommend: z.boolean().optional().describe("C4: Recommend"),
      neither_require_nor_recommend: z.boolean().optional().describe("C4: Neither require nor recommend"),
    })
    .describe("C4: Does your institution require or recommend a general college-preparatory program for degree-seeking students?"),
  // C5
  distribution_of_high_school_units_required_and_or_recommended: z
    .object({
      total_academic_units_required: z.number().optional().describe("C5: Total academic units: Units Required"),
      total_academic_units_recommended: z.number().optional().describe("C5: Total academic units: Units Recommended"),
      english_required: z.number().optional().describe("C5: English: Units Required"),
      english_recommended: z.number().optional().describe("C5: English: Units Recommended"),
      mathematics_required: z.number().optional().describe("C5: Mathematics: Units Required"),
      mathematics_recommended: z.number().optional().describe("C5: Mathematics: Units Recommended"),
      science_required: z.number().optional().describe("C5: Science: Units Required"),
      science_recommended: z.number().optional().describe("C5: Science: Units Recommended"),
      science_lab_required: z.number().optional().describe("C5: Science, Of these, units that must be lab: Units Required"),
      science_lab_recommended: z.number().optional().describe("C5: Science, Of these, units that must be lab: Units Recommended"),
      foreign_language_required: z.number().optional().describe("C5: Foreign language: Units Required"),
      foreign_language_recommended: z.number().optional().describe("C5: Foreign language: Units Recommended"),
      social_studies_required: z.number().optional().describe("C5: Social studies: Units Required"),
      social_studies_recommended: z.number().optional().describe("C5: Social studies: Units Recommended"),
      history_required: z.number().optional().describe("C5: History: Units Required"),
      history_recommended: z.number().optional().describe("C5: History: Units Recommended"),
      academic_electives_required: z.number().optional().describe("C5: Academic electives: Units Required"),
      academic_electives_recommended: z.number().optional().describe("C5: Academic electives: Units Recommended"),
      computer_science_required: z.number().optional().describe("C5: Computer Science: Units Required"),
      computer_science_recommended: z.number().optional().describe("C5: Computer Science: Units Recommended"),
      visual_performing_arts_required: z.number().optional().describe("C5: Visual/Performing Arts: Units Required"),
      visual_performing_arts_recommended: z.number().optional().describe("C5: Visual/Performing Arts: Units Recommended"),
      other_required: z.number().optional().describe("C5: Visual/Performing Arts: Other (specify) Required"),
      other_recommended: z.number().optional().describe("C5: Visual/Performing Arts: Other (specify) Recommended"),
    })
    .describe("C5: Distribution of high school units required and/or recommended"),
  // C6
  open_admission_policy: z
    .object({
      open_admission_policy_as_described_above_for_all_students: z.boolean().optional().describe("C6: Open admission policy as described above for all students"),
      selective_admission_for_out_of_state_students: z.boolean().optional().describe("C6: selective admission for out-of-state students"),
      selective_admission_to_some_programs: z.boolean().optional().describe("C6: selective admission to some programs"),
      other: z.boolean().optional().describe("C6: other (explain)"),
    })
    .describe("C6: Do you have an open admission policy, under which virtually all secondary school graduates or students with GED equivalency diplomas are admitted without regard to academic record, test scores, or other qualifications?"),
  // C7
  relative_importance_of_academic_non_academic_factors: z
    .object({
      rigor_of_secondary_school_record: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Rigor of secondary school record"),
      class_rank: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Class rank"),
      academic_gpa: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Academic GPA"),
      standardized_test_scores: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Standardized test scores"),
      application_essay: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Application Essay"),
      recommendations: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Recommendation(s)"),
      interview: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Interview"),
      extracurricular_activities: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Extracurricular activities"),
      talent_ability: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Talent/ability"),
      character_personal_qualities: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Character/personal qualities"),
      first_generation: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: First generation"),
      alumni_relation: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Alumni/ae relation"),
      geographical_residence: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Geographical residence"),
      state_residency: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: State residency"),
      religious_affiliation_commitment: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Religious affiliation/commitment"),
      volunteer_work: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Volunteer work"),
      work_experience: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Work experience"),
      level_of_applicants_interest: z.enum(["very_important", "important", "considered", "not_considered"]).optional().describe("C7: Level of applicant's interest"),
    })
    .describe("C7: Relative importance of academic and nonacademic factors in your first-time, first-year, degree-seeking general (not including programs with specific criteria) admissions decisions"),
  // C8
  sat_and_act_policies: z
    .object({
      use_sat_act_in_admission_decisions: z.boolean().optional().describe("C8: Does your institution make use of SAT or ACT scores in admission decisions for first-time, first-year, degree-seeking applicants?"),
      sat_or_act_policy: z.enum(["required_to_be_considered", "required_for_some", "recommended", "not_required_but_considered", "not_considered"]).optional().describe("C8A: SAT or ACT"),
      act_policy: z.enum(["required_to_be_considered", "required_for_some", "recommended", "not_required_but_considered", "not_considered"]).optional().describe("C8A: ACT Only"),
      sat_policy: z.enum(["required_to_be_considered", "required_for_some", "recommended", "not_required_but_considered", "not_considered"]).optional().describe("C8A: SAT Only"),
      uses_test_scores_for_academic_advising: z.boolean().optional().describe("C8D: In addition, does your institution use applicants' test scores for academic advising?"),
      latest_date_for_sat_or_act_scores: z.string().optional().describe("C8E: Latest date by which SAT or ACT scores must be received for fall-term admission"),
      clarification_for_test_policy: z.string().optional().describe("C8F: If necessary, use this space to clarify your test policies"),
      tests_used_for_placement: z.array(z.enum(["sat", "act", "ap", "clep", "institutional_exam", "state_exam"])).describe("C8G: Please indicate which tests your institution uses for placement (e.g., state tests)"),
    })
    .describe("C8: SAT and ACT policies"),
  // C9
  sat_act_first_time_first_year: z
    .object({
      percent_submitting_sat_scores: z.number().describe("C9: Percent Submitting SAT Scores, from 0% to 100%"),
      number_submitting_sat_scores: z.number().describe("C9: Number Submitting SAT Scores"),
      percent_submitting_act_scores: z.number().describe("C9: Submitting ACT Scores, from 0% to 100%"),
      number_submitting_act_scores: z.number().describe("C9: Number Submitting ACT Scores"),
    })
    .describe("C9: Percent and number of first-time, first-year students enrolled who submitted national standardized (SAT/ACT) test scores"),
  sat_act_score_percentiles: z
    .object({
      sat_composite_25th_percentile: z.number().optional().describe("C9: SAT Composite 25th Percentile"),
      sat_composite_50th_percentile: z.number().optional().describe("C9: SAT Composite 50th Percentile"),
      sat_composite_75th_percentile: z.number().optional().describe("C9: SAT Composite 75th Percentile"),
      sat_ebrw_25th_percentile: z.number().optional().describe("C9: SAT Evidence-Based Reading and Writing 25th Percentile"),
      sat_ebrw_50th_percentile: z.number().optional().describe("C9: SAT Evidence-Based Reading and Writing 50th Percentile"),
      sat_ebrw_75th_percentile: z.number().optional().describe("C9: SAT Evidence-Based Reading and Writing 75th Percentile"),
      sat_math_25th_percentile: z.number().optional().describe("C9: SAT Math 25th Percentile"),
      sat_math_50th_percentile: z.number().optional().describe("C9: SAT Math 50th Percentile"),
      sat_math_75th_percentile: z.number().optional().describe("C9: SAT Math 75th Percentile"),
      act_composite_25th_percentile: z.number().optional().describe("C9: ACT Composite 25th Percentile"),
      act_composite_50th_percentile: z.number().optional().describe("C9: ACT Composite 50th Percentile"),
      act_composite_75th_percentile: z.number().optional().describe("C9: ACT Composite 75th Percentile"),
      act_math_25th_percentile: z.number().optional().describe("C9: ACT Math 25th Percentile"),
      act_math_50th_percentile: z.number().optional().describe("C9: ACT Math 50th Percentile"),
      act_math_75th_percentile: z.number().optional().describe("C9: ACT Math 75th Percentile"),
      act_english_25th_percentile: z.number().optional().describe("C9: ACT English 25th Percentile"),
      act_english_50th_percentile: z.number().optional().describe("C9: ACT English 50th Percentile"),
      act_english_75th_percentile: z.number().optional().describe("C9: ACT English 75th Percentile"),
      act_writing_25th_percentile: z.number().optional().describe("C9: ACT Writing 25th Percentile"),
      act_writing_50th_percentile: z.number().optional().describe("C9: ACT Writing 50th Percentile"),
      act_writing_75th_percentile: z.number().optional().describe("C9: ACT Writing 75th Percentile"),
      act_science_25th_percentile: z.number().optional().describe("C9: ACT Science 25th Percentile"),
      act_science_50th_percentile: z.number().optional().describe("C9: ACT Science 50th Percentile"),
      act_science_75th_percentile: z.number().optional().describe("C9: ACT Science 75th Percentile"),
      act_reading_25th_percentile: z.number().optional().describe("C9: ACT Reading 25th Percentile"),
      act_reading_50th_percentile: z.number().optional().describe("C9: ACT Reading 50th Percentile"),
      act_reading_75th_percentile: z.number().optional().describe("C9: ACT Reading 75th Percentile"),
    })
    .describe("C9: For each assessment below, report the score that represents the 25th and 75th percentile score"),
  sat_score_percentages: z
    .object({
      sat_ebrw_percent_score_700_to_800: z.number().min(0).max(100).optional().describe("C9: Score Range 700-800, SAT Evidence-Based Reading and Writing, from 0% to 100%"),
      sat_ebrw_percent_score_600_to_699: z.number().min(0).max(100).optional().describe("C9: Score Range 600-699, SAT Evidence-Based Reading and Writing, from 0% to 100%"),
      sat_ebrw_percent_score_500_to_599: z.number().min(0).max(100).optional().describe("C9: Score Range 500-599, SAT Evidence-Based Reading and Writing, from 0% to 100%"),
      sat_ebrw_percent_score_400_to_499: z.number().min(0).max(100).optional().describe("C9: Score Range 400-499, SAT Evidence-Based Reading and Writing, from 0% to 100%"),
      sat_ebrw_percent_score_300_to_399: z.number().min(0).max(100).optional().describe("C9: Score Range 300-399, SAT Evidence-Based Reading and Writing, from 0% to 100%"),
      sat_ebrw_percent_score_200_to_299: z.number().min(0).max(100).optional().describe("C9: Score Range 200-299, SAT Evidence-Based Reading and Writing, from 0% to 100%"),
      sat_math_percent_score_700_to_800: z.number().min(0).max(100).optional().describe("C9: Score Range 700-800, SAT Math, from 0% to 100%"),
      sat_math_percent_score_600_to_699: z.number().min(0).max(100).optional().describe("C9: Score Range 600-699, SAT Math, from 0% to 100%"),
      sat_math_percent_score_500_to_599: z.number().min(0).max(100).optional().describe("C9: Score Range 500-599, SAT Math, from 0% to 100%"),
      sat_math_percent_score_400_to_499: z.number().min(0).max(100).optional().describe("C9: Score Range 400-499, SAT Math, from 0% to 100%"),
      sat_math_percent_score_300_to_399: z.number().min(0).max(100).optional().describe("C9: Score Range 300-399, SAT Math, from 0% to 100%"),
      sat_math_percent_score_200_to_299: z.number().min(0).max(100).optional().describe("C9: Score Range 200-299, SAT Math, from 0% to 100%"),
      sat_composite_percent_score_1400_to_1600: z.number().min(0).max(100).optional().describe("C9: Score Range 1400-1600, SAT Composite, from 0% to 100%"),
      sat_composite_percent_score_1200_to_1399: z.number().min(0).max(100).optional().describe("C9: Score Range 1200-1399, SAT Composite, from 0% to 100%"),
      sat_composite_percent_score_1000_to_1199: z.number().min(0).max(100).optional().describe("C9: Score Range 1000-1199, SAT Composite, from 0% to 100%"),
      sat_composite_percent_score_800_to_999: z.number().min(0).max(100).optional().describe("C9: Score Range 800-999, SAT Composite, from 0% to 100%"),
      sat_composite_percent_score_600_to_799: z.number().min(0).max(100).optional().describe("C9: Score Range 600-799, SAT Composite, from 0% to 100%"),
      sat_composite_percent_score_400_to_599: z.number().min(0).max(100).optional().describe("C9: Score Range 400-599, SAT Composite, from 0% to 100%"),
    })
    .describe("C9: Percent of first-time, first-year students with scores in each range"),
  act_score_percentages: z
    .object({
      act_composite_percent_score_30_to_36: z.number().min(0).max(100).optional().describe("C9: Score Range 30-36, ACT Composite, from 0% to 100%"),
      act_composite_percent_score_24_to_39: z.number().min(0).max(100).optional().describe("C9: Score Range 24-39, ACT Composite, from 0% to 100%"),
      act_composite_percent_score_18_to_23: z.number().min(0).max(100).optional().describe("C9: Score Range 18-23, ACT Composite, from 0% to 100%"),
      act_composite_percent_score_12_to_17: z.number().min(0).max(100).optional().describe("C9: Score Range 12-17, ACT Composite, from 0% to 100%"),
      act_composite_percent_score_6_to_11: z.number().min(0).max(100).optional().describe("C9: Score Range 6-11, ACT Composite, from 0% to 100%"),
      act_composite_percent_score_below_6: z.number().min(0).max(100).optional().describe("C9: Score Below 6, ACT Composite, from 0% to 100%"),
      act_english_percent_score_30_to_36: z.number().min(0).max(100).optional().describe("C9: Score Range 30-36, ACT English, from 0% to 100%"),
      act_english_percent_score_24_to_39: z.number().min(0).max(100).optional().describe("C9: Score Range 24-39, ACT English, from 0% to 100%"),
      act_english_percent_score_18_to_23: z.number().min(0).max(100).optional().describe("C9: Score Range 18-23, ACT English, from 0% to 100%"),
      act_english_percent_score_12_to_17: z.number().min(0).max(100).optional().describe("C9: Score Range 12-17, ACT English, from 0% to 100%"),
      act_english_percent_score_6_to_11: z.number().min(0).max(100).optional().describe("C9: Score Range 6-11, ACT English, from 0% to 100%"),
      act_english_percent_score_below_6: z.number().min(0).max(100).optional().describe("C9: Score Below 6, ACT English, from 0% to 100%"),
      act_math_percent_score_30_to_36: z.number().min(0).max(100).optional().describe("C9: Score Range 30-36, ACT Math, from 0% to 100%"),
      act_math_percent_score_24_to_39: z.number().min(0).max(100).optional().describe("C9: Score Range 24-39, ACT Math, from 0% to 100%"),
      act_math_percent_score_18_to_23: z.number().min(0).max(100).optional().describe("C9: Score Range 18-23, ACT Math, from 0% to 100%"),
      act_math_percent_score_12_to_17: z.number().min(0).max(100).optional().describe("C9: Score Range 12-17, ACT Math, from 0% to 100%"),
      act_math_percent_score_6_to_11: z.number().min(0).max(100).optional().describe("C9: Score Range 6-11, ACT Math, from 0% to 100%"),
      act_math_percent_score_below_6: z.number().min(0).max(100).optional().describe("C9: Score Below 6, ACT Math, from 0% to 100%"),
      act_reading_percent_score_30_to_36: z.number().min(0).max(100).optional().describe("C9: Score Range 30-36, ACT Reading, from 0% to 100%"),
      act_reading_percent_score_24_to_39: z.number().min(0).max(100).optional().describe("C9: Score Range 24-39, ACT Reading, from 0% to 100%"),
      act_reading_percent_score_18_to_23: z.number().min(0).max(100).optional().describe("C9: Score Range 18-23, ACT Reading, from 0% to 100%"),
      act_reading_percent_score_12_to_17: z.number().min(0).max(100).optional().describe("C9: Score Range 12-17, ACT Reading, from 0% to 100%"),
      act_reading_percent_score_6_to_11: z.number().min(0).max(100).optional().describe("C9: Score Range 6-11, ACT Reading, from 0% to 100%"),
      act_reading_percent_score_below_6: z.number().min(0).max(100).optional().describe("C9: Score Below 6, ACT Reading, from 0% to 100%"),
      act_science_percent_score_30_to_36: z.number().min(0).max(100).optional().describe("C9: Score Range 30-36, ACT Science, from 0% to 100%"),
      act_science_percent_score_24_to_39: z.number().min(0).max(100).optional().describe("C9: Score Range 24-39, ACT Science, from 0% to 100%"),
      act_science_percent_score_18_to_23: z.number().min(0).max(100).optional().describe("C9: Score Range 18-23, ACT Science, from 0% to 100%"),
      act_science_percent_score_12_to_17: z.number().min(0).max(100).optional().describe("C9: Score Range 12-17, ACT Science, from 0% to 100%"),
      act_science_percent_score_6_to_11: z.number().min(0).max(100).optional().describe("C9: Score Range 6-11, ACT Science, from 0% to 100%"),
      act_science_percent_score_below_6: z.number().min(0).max(100).optional().describe("C9: Score Below 6, ACT Science, from 0% to 100%"),
    })
    .describe("C9: Percent of first-time, first-year students with scores in each range"),
  // C10
  high_school_class_rank: z
    .object({
      percent_in_top_tenth: z.number().min(0).max(100).optional().describe("C10: Percent in top tenth of high school graduating class, from 0% to 100%"),
      percent_in_top_quarter: z.number().min(0).max(100).optional().describe("C10: Percent in top quarter of high school graduating class, from 0% to 100%"),
      percent_in_top_half: z.number().min(0).max(100).optional().describe("C10: Percent in top half of high school graduating class, from 0% to 100%"),
      percent_in_bottom_half: z.number().min(0).max(100).optional().describe("C10: Percent in bottom half of high school graduating class, from 0% to 100%"),
      percent_in_bottom_quarter: z.number().min(0).max(100).optional().describe("C10: Percent in bottom quarter of high school graduating class, from 0% to 100%"),
      percent_who_submitted_class_rank: z.number().min(0).max(100).optional().describe("C10: Percent of total first-time, first-year students who submitted high school class rank"),
    })
    .describe("C10: Percent of all degree-seeking, first-time, first-year students who had high school class rank within each of the following ranges:"),
  // C11
  high_school_gpa_percentages: z
    .object({
      percent_who_submitted_with_gpa_of_4_0: z.number().optional().describe("C11: Percent (Students who submitted scores) who had GPA of 4.0, from 0% to 100%"),
      percent_who_submitted_with_gpa_between_3_75_and_3_99: z.number().min(0).max(100).optional().describe("C11: Percent (Students who submitted scores) who had GPA between 3.75 and 3.99, from 0% to 100%"),
      percent_who_submitted_with_gpa_between_3_50_and_3_74: z.number().min(0).max(100).optional().describe("C11: Percent (Students who submitted scores) who had GPA between 3.50 and 3.74, from 0% to 100%"),
      percent_who_submitted_with_gpa_between_3_25_and_3_49: z.number().min(0).max(100).optional().describe("C11: Percent (Students who submitted scores) who had GPA between 3.25 and 3.49, from 0% to 100%"),
      percent_who_submitted_with_gpa_between_3_00_and_3_24: z.number().min(0).max(100).optional().describe("C11: Percent (Students who submitted scores) who had GPA between 3.00 and 3.24, from 0% to 100%"),
      percent_who_submitted_with_gpa_between_2_50_and_2_99: z.number().min(0).max(100).optional().describe("C11: Percent (Students who submitted scores) who had GPA between 2.50 and 2.99, from 0% to 100%"),
      percent_who_submitted_with_gpa_between_2_0_and_2_49: z.number().min(0).max(100).optional().describe("C11: Percent (Students who submitted scores) who had GPA between 2.0 and 2.49, from 0% to 100%"),
      percent_who_submitted_with_gpa_between_1_0_and_1_99: z.number().min(0).max(100).optional().describe("C11: Percent (Students who submitted scores) who had GPA between 1.0 and 1.99, from 0% to 100%"),
      percent_who_submitted_with_gpa_between_below_1_0: z.number().min(0).max(100).optional().describe("C11: Percent (Students who submitted scores) who had GPA below 1.0, from 0% to 100%"),
      percent_who_did_not_submit_with_gpa_of_4_0: z.number().min(0).max(100).optional().describe("C11: Percent (Students who did not submit scores) who had GPA of 4.0, from 0% to 100%"),
      percent_who_did_not_submit_with_gpa_between_3_75_and_3_99: z.number().min(0).max(100).optional().describe("C11: Percent (Students who did not submit scores) who had GPA between 3.75 and 3.99, from 0% to 100%"),
      percent_who_did_not_submit_with_gpa_between_3_50_and_3_74: z.number().min(0).max(100).optional().describe("C11: Percent (Students who did not submit scores) who had GPA between 3.50 and 3.74, from 0% to 100%"),
      percent_who_did_not_submit_with_gpa_between_3_25_and_3_49: z.number().min(0).max(100).optional().describe("C11: Percent (Students who did not submit scores) who had GPA between 3.25 and 3.49, from 0% to 100%"),
      percent_who_did_not_submit_with_gpa_between_3_00_and_3_24: z.number().min(0).max(100).optional().describe("C11: Percent (Students who did not submit scores) who had GPA between 3.00 and 3.24, from 0% to 100%"),
      percent_who_did_not_submit_with_gpa_between_2_50_and_2_99: z.number().min(0).max(100).optional().describe("C11: Percent (Students who did not submit scores) who had GPA between 2.50 and 2.99, from 0% to 100%"),
      percent_who_did_not_submit_with_gpa_between_2_0_and_2_49: z.number().min(0).max(100).optional().describe("C11: Percent (Students who did not submit scores) who had GPA between 2.0 and 2.49, from 0% to 100%"),
      percent_who_did_not_submit_with_gpa_between_1_0_and_1_99: z.number().min(0).max(100).optional().describe("C11: Percent (Students who did not submit scores) who had GPA between 1.0 and 1.99, from 0% to 100%"),
      percent_who_did_not_submit_with_gpa_between_below_1_0: z.number().optional().describe("C11: Percent (Students who did not submit scores) who had GPA below 1.0, from 0% to 100%"),
      percent_all_with_gpa_of_4_0: z.number().min(0).max(100).optional().describe("C11: Percent (All enrolled students) who had GPA of 4.0, from 0% to 100%"),
      percent_all_with_gpa_between_3_75_and_3_99: z.number().min(0).max(100).optional().describe("C11: Percent (All enrolled students) who had GPA between 3.75 and 3.99, from 0% to 100%"),
      percent_all_with_gpa_between_3_50_and_3_74: z.number().min(0).max(100).optional().describe("C11: Percent (All enrolled students) who had GPA between 3.50 and 3.74, from 0% to 100%"),
      percent_all_with_gpa_between_3_25_and_3_49: z.number().min(0).max(100).optional().describe("C11: Percent (All enrolled students) who had GPA between 3.25 and 3.49, from 0% to 100%"),
      percent_all_with_gpa_between_3_00_and_3_24: z.number().min(0).max(100).optional().describe("C11: Percent (All enrolled students) who had GPA between 3.00 and 3.24, from 0% to 100%"),
      percent_all_with_gpa_between_2_50_and_2_99: z.number().min(0).max(100).optional().describe("C11: Percent (All enrolled students) who had GPA between 2.50 and 2.99, from 0% to 100%"),
      percent_all_with_gpa_between_2_0_and_2_49: z.number().min(0).max(100).optional().describe("C11: Percent (All enrolled students) who had GPA between 2.0 and 2.49, from 0% to 100%"),
      percent_all_with_gpa_between_1_0_and_1_99: z.number().min(0).max(100).optional().describe("C11: Percent (All enrolled students) who had GPA between 1.0 and 1.99, from 0% to 100%"),
      percent_all_with_gpa_between_below_1_0: z.number().min(0).max(100).optional().describe("C11: Percent (All enrolled students) who had GPA below 1.0, from 0% to 100%"),
    })
    .describe("C11: Percentage of all enrolled, degree-seeking, first-time, first-year students who had high school grade-point averages within each of the following ranges (using 4.0 scale)"),
  // C12
  average_high_school_gpa: z.number().min(0).max(4).optional().describe("C12: Average high school GPA of all degree-seeking, first-time, first-year students who submitted GPA"),
  percent_who_submitted_gpa: z.number().min(0).max(100).optional().describe("C12: Percent of total first-time, first-year students who submitted high school GPA, from 0% to 100%"),
  // C13
  application_fee: z
    .object({
      has_application_fee: z.boolean().optional().describe("C13: Does your institution have an application fee?"),
      amount_of_application_fee: z.number().min(0).optional().describe("C13: Amount of application fee in dollars"),
      can_be_waived: z.boolean().optional().describe("C13: Can it be waived for applicants with financial need?"),
    })
    .describe("C13: Application Fee"),
  // C14
  application_closing_date: z
    .object({
      has_application_closing_date: z.boolean().optional().describe("C14: Does your institution have an application closing date?"),
      application_closing_date_fall: z.string().optional().describe("C14: Application closing date (fall)"),
      priority_date: z.string().optional().describe("C14: Priority Date"),
    })
    .describe("C14: Application closing date"),
  // C15
  has_non_fall_application_term: z.boolean().optional().describe("C15: Are first-time, first-year students accepted for terms other than the fall?"),
  // C16
  notification_of_admission_decision: z
    .object({
      is_on_a_rolling_basis: z.boolean().optional().describe("C16: On a rolling basis"),
      rolling_basis_start_date: z.string().optional().describe("C16: On a rolling basis beginning (date)"),
      by_date: z.string().optional().describe("C16: By (date)"),
      other: z.string().optional().describe("C16: Other:"),
    })
    .describe("C16: Notification to applicants of admission decision"),
  // C17
  reply_policy_for_admitted_applicants: z
    .object({
      must_reply_by_date: z.string().optional().describe("C17: Must reply by (date)"),
      no_set_date: z.boolean().optional().describe("C17: No set date"),
      reply_by_may_1_or_within_weeks: z.number().optional().describe("C17: Must reply by May 1st or within (number) weeks if notified thereafter"),
      other: z.string().optional().describe("C17: Other:"),
      deadline_for_housing_deposit: z.string().optional().describe("C17: Deadline for housing deposit (MMDD)"),
      amount_of_housing_deposit: z.number().optional().describe("C17: Amount of housing deposit in dollars"),
      housing_deposit_refundable: z.enum(["yes_in_full", "yes_in_part", "no"]).optional().describe("C17: Refundable if student does not enroll?"),
    })
    .describe("C17: Reply policy for admitted applicants"),
  // C18
  deferred_admission_policy: z
    .object({
      allows_deferred_admission: z.boolean().optional().describe("C18: Does your institution allow students to postpone enrollment after admission?"),
      max_period_of_postponement: z.string().optional().describe("C18: If yes, maximum period of postponement (e.g. 1 year)"),
    })
    .describe("C18: Deferred admission"),
  // C19
  allows_early_admission_of_high_school_students: z
    .boolean()
    .optional()
    .describe("C19: Does your institution allow high school students to enroll as full-time, first-time, first-year students one year or more before high school graduation?"),
  // C21
  early_decision_policy: z
    .object({
      has_early_decision_plan: z
        .boolean()
        .optional()
        .describe(
          "C21: Does your institution offer an early decision plan (an admission plan that permits students to apply and be notified of admission decision well in advance of the regular notification date and that asks students to commit to attending if accepted) for first-time, first-year applicants for fall enrollment?",
        ),
      first_or_only_early_decision_plan_closing_date: z.string().optional().describe("C21: First or only early decision plan closing date"),
      first_or_only_early_decision_plan_notification_date: z.string().optional().describe("C21: First or only early decision plan notification date"),
      other_early_decision_plan_closing_date: z.string().optional().describe("C21: Other early decision plan closing date"),
      other_early_decision_plan_notification_date: z.string().optional().describe("C21: Other early decision plan notification date"),
      number_of_early_decision_applicants: z.number().optional().describe("C21: Number of early decision applicants received by your institution"),
      number_of_applicants_admitted_under_early_decision_plan: z.number().optional().describe("C21: Number of applicants admitted under early decision plan"),
      significant_details_about_early_decision_plan: z.string().optional().describe("C21: Please provide significant details about your early decision plan"),
    })
    .describe("C21: Early Decision"),
  // C22
  early_action_policy: z
    .object({
      has_early_action_plan: z
        .boolean()
        .optional()
        .describe("C22: Do you have a nonbinding early action plan whereby students are notified of an admission decision well in advance of the regular notification date but do not have to commit to attending your college?"),
      early_action_closing_date: z.string().optional().describe("C22: Early action closing date"),
      early_action_notification_date: z.string().optional().describe("C22: Early action notification date"),
      is_restrictive_early_action: z.boolean().optional().describe("C22: Is your early action plan a 'restrictive' plan under which you limit students from applying to other early plans?"),
    })
    .describe("C22: Early action"),
  // D1
  enrolls_transfer_students: z.boolean().optional().describe("D1: Does your institution enroll transfer students? (If no, please skip to Section E)"),
  allows_transfer_credit: z.boolean().optional().describe("D1: If yes, may transfer students earn advanced standing credit by transferring credits earned from course work completed at other colleges/universities?"),
  // D2
  transfer_admission_stats: z
    .object({
      male_applicants: z.number().optional().describe("D2: Male, Applicants"),
      female_applicants: z.number().optional().describe("D2: Female, Applicants"),
      another_gender_applicants: z.number().optional().describe("D2: Another Gender, Applicants"),
      unknown_gender_applicants: z.number().optional().describe("D2: Unknown Gender, Applicants"),
      male_admitted: z.number().optional().describe("D2: Male, Admitted Applicants"),
      female_admitted: z.number().optional().describe("D2: Female, Admitted Applicants"),
      another_gender_admitted: z.number().optional().describe("D2: Another Gender, Admitted Applicants"),
      unknown_gender_admitted: z.number().optional().describe("D2: Unknown Gender, Admitted Applicants"),
      male_enrolled: z.number().optional().describe("D2: Male, Enrolled Applicants"),
      female_enrolled: z.number().optional().describe("D2: Female, Enrolled Applicants"),
      another_gender_enrolled: z.number().optional().describe("D2: Another Gender, Enrolled Applicants"),
      unknown_gender_enrolled: z.number().optional().describe("D2: Unknown Gender, Enrolled Applicants"),
    })
    .describe("D2: Provide the number of students who applied, were admitted, and enrolled as degree-seeking transfer students in Fall 2025."),
  // D3
  transfer_terms: z.array(z.enum(["fall", "winter", "spring", "summer"])).describe("D3: Indicate terms for which transfers may enroll"),
  // D4
  has_minimum_transfer_credit_requirements: z.boolean().optional().describe("D4: Must a transfer applicant have a minimum number of credits completed or else must apply as an entering first-year student?"),
  minimum_credits_and_unit_of_measure: z.string().optional().describe("D4: If yes, what is the minimum number of credits and the unit of measure?"),
  // D5
  transfer_application_requirements: z
    .object({
      high_school_transcript: z.enum(["required_of_all", "recommended_of_all", "recommended_of_some", "required_of_some", "not_required"]).optional().describe("D5: High school transcript"),
      college_transcripts: z.enum(["required_of_all", "recommended_of_all", "recommended_of_some", "required_of_some", "not_required"]).optional().describe("D5: College transcript(s)"),
      essay_or_personal_statement: z.enum(["required_of_all", "recommended_of_all", "recommended_of_some", "required_of_some", "not_required"]).optional().describe("D5: Essay or personal statement"),
      interview: z.enum(["required_of_all", "recommended_of_all", "recommended_of_some", "required_of_some", "not_required"]).optional().describe("D5: Interview"),
      standardized_test_scores: z.enum(["required_of_all", "recommended_of_all", "recommended_of_some", "required_of_some", "not_required"]).optional().describe("D5: Standardized test scores"),
      statement_of_good_standing: z.enum(["required_of_all", "recommended_of_all", "recommended_of_some", "required_of_some", "not_required"]).optional().describe("D5: Statement of good standing from prior institution(s)"),
    })
    .describe("D5: Indicate all items required of transfer students to apply for admission"),
  // D6
  minimum_high_school_gpa_for_transfer_admission: z.number().optional().describe("D6: If a minimum high school grade point average is required of transfer applicants, specify (on a 4.0 scale)"),
  // D7
  minimum_college_gpa_for_transfer_admission: z.number().optional().describe("D7: If a minimum college grade point average is required of transfer applicants, specify (on a 4.0 scale)"),
  // D8
  other_transfer_requirements: z.string().optional().describe("D8: List any other requirements specific to transfer applicants"),
  // D9
  transfer_application_dates: z
    .object({
      fall_priority_date: z.string().optional().describe("D9: Fall, Priority Date"),
      fall_closing_date: z.string().optional().describe("D9: Fall, Closing Date"),
      fall_notification_date: z.string().optional().describe("D9: Fall, Notification Date"),
      fall_reply_date: z.string().optional().describe("D9: Fall, Reply Date"),
      fall_rolling_admission_date: z.string().optional().describe("D9: Fall, Rolling Admission"),
      winter_priority_date: z.string().optional().describe("D9: Winter, Priority Date"),
      winter_closing_date: z.string().optional().describe("D9: Winter, Closing Date"),
      winter_notification_date: z.string().optional().describe("D9: Winter, Notification Date"),
      winter_reply_date: z.string().optional().describe("D9: Winter, Reply Date"),
      winter_rolling_admission_date: z.string().optional().describe("D9: Winter, Rolling Admission"),
      spring_priority_date: z.string().optional().describe("D9: Spring, Priority Date"),
      spring_closing_date: z.string().optional().describe("D9: Spring, Closing Date"),
      spring_notification_date: z.string().optional().describe("D9: Spring, Notification Date"),
      spring_reply_date: z.string().optional().describe("D9: Spring, Reply Date"),
      spring_rolling_admission_date: z.string().optional().describe("D9: Spring, Rolling Admission"),
      summer_priority_date: z.string().optional().describe("D9: Summer, Priority Date"),
      summer_closing_date: z.string().optional().describe("D9: Summer, Closing Date"),
      summer_notification_date: z.string().optional().describe("D9: Summer, Notification Date"),
      summer_reply_date: z.string().optional().describe("D9: Summer, Reply Date"),
      summer_rolling_admission_date: z.string().optional().describe("D9: Summer, Rolling Admission"),
    })
    .describe("D9: List application priority, closing, notification, and candidate reply dates for transfer students"),
  // D10
  open_admission_applies_to_transfer_students: z.boolean().optional().describe("D10: Does an open admission policy, if reported, apply to transfer students?"),
  // D11
  additional_transfer_admission_requirements: z.string().optional().describe("D11: Describe additional requirements for transfer admission, if applicable"),
  // D12
  lowest_grade_that_may_be_transferred_for_credit: z.string().optional().describe("D12: Report the lowest grade earned for any course that may be transferred for credit"),
  // D13
  max_credits_or_courses_that_may_be_transferred_from_two_year_institutions: z
    .object({
      number: z.number().optional().describe("D13: Number"),
      unit_type: z.string().optional().describe("D13: Unit Type (e.g. Credits)"),
    })
    .describe("D13: Maximum number of credits or courses that may be transferred from a two-year institution"),
  // D14
  max_credits_or_courses_that_may_be_transferred_from_four_year_institutions: z
    .object({
      number: z.number().optional().describe("D14: Number"),
      unit_type: z.string().optional().describe("D14: Unit Type (e.g. Credits)"),
    })
    .describe("D14: Maximum number of credits or courses that may be transferred from a four-year institution"),
  // D15
  min_credits_transfers_must_complete_at_your_institution_for_associate_degree: z.number().optional().describe("D15: Minimum number of credits that transfers must complete at your institution to earn an associate degree"),
  // D16
  min_credits_transfers_must_complete_at_your_institution_for_bachelors_degree: z.number().optional().describe("D15: Minimum number of credits that transfers must complete at your institution to earn a bachelor's degree"),
  // D17
  other_transfer_credit_policies: z.string().optional().describe("D17: Describe other transfer credit policies"),
  // D18
  military_transfer_credit_policies: z
    .object({
      accepts_american_council_on_education: z.boolean().optional().describe("D18: American Council on Education (ACE)"),
      accepts_college_level_examination_program: z.boolean().optional().describe("D18: College Level Examination Program (CLEP)"),
      accepts_dantes_subject_standardized_tests: z.boolean().optional().describe("D18: DANTES Subject Standardized Tests (DSST)"),
    })
    .describe("D18: Military Service Transfer Credit Policies"),
  // D19
  max_credits_or_courses_that_may_be_transferred_from_american_council_on_education: z
    .object({
      number: z.number().optional().describe("D19: Number"),
      unit_type: z.string().optional().describe("D19: Unit Type (e.g. Credits)"),
    })
    .describe("D19: Maximum number of credits or courses that may be transferred based on military education evaluated by the American Council on Education (ACE)"),
  // D20
  max_credits_or_courses_that_may_be_transferred_from_clep_or_dsst: z
    .object({
      number: z.number().optional().describe("D19: Number"),
      unit_type: z.string().optional().describe("D19: Unit Type (e.g. Credits)"),
    })
    .describe("D19: Maximum number of credits or courses that may be transferred based on Department of Defense supported prior learning assessments (College Level Examination Program (CLEP) or DANTES Subject Standardized Tests (DSST))"),
  // D21
  military_veteran_transfer_policies_are_published_online: z.boolean().optional().describe("D21: Are the military/veteran credit transfer policies published on your website?"),
  // D22
  military_veteran_transfer_policies_url: z.string().optional().describe("D22: If yes, please provide the URL where the policy can be located:"),
  other_military_veteran_transfer_policies: z.string().optional().describe("D22: Describe other military/veteran transfer credit policies unique to your institution:"),
  // E1
  special_study_options: z
    .object({
      has_accelerated_program: z.boolean().optional().describe("E1: Accelerated program"),
      has_comprehensive_transition_and_postsecondary_program_for_students_with_intellectual_disabilities: z.boolean().optional().describe("E1: Comprehensive transition and postsecondary program for students with intellectual disabilities"),
      has_cross_registration: z.boolean().optional().describe("E1: Cross registration"),
      has_distance_learning: z.boolean().optional().describe("E1: Distance learning"),
      has_double_major: z.boolean().optional().describe("E1: Double major"),
      has_english_as_second_language: z.boolean().optional().describe("E1: English as a Second Language (ESL)"),
      has_exchange_student_program_domestic: z.boolean().optional().describe("E1: Exchange student program (domestic)"),
      has_external_degree_program: z.boolean().optional().describe("E1: External degree program"),
      has_honors_program: z.boolean().optional().describe("E1: Honors program"),
      has_independent_study: z.boolean().optional().describe("E1: Independent study"),
      has_internships: z.boolean().optional().describe("E1: Internships"),
      has_liberal_arts_career_combination: z.boolean().optional().describe("E1: Liberal arts/career combination"),
      has_student_designed_major: z.boolean().optional().describe("E1: Student-designed major"),
      has_study_abroad: z.boolean().optional().describe("E1: Study abroad"),
      has_teacher_certification_program: z.boolean().optional().describe("E1: Teacher certification program"),
      has_undergraduate_research: z.boolean().optional().describe("E1: Undergraduate research"),
      has_weekend_college: z.boolean().optional().describe("E1: Weekend college"),
      other: z.string().optional().describe("E1: Other (specify):"),
    })
    .describe("E1: Special study options"),
  // E3
  graduation_requirements: z
    .object({
      requires_arts_fine_arts: z.boolean().optional().describe("E3: Arts/fine arts"),
      requires_computer_literacy: z.boolean().optional().describe("E3: Computer literacy"),
      requires_english: z.boolean().optional().describe("E3: English (including composition)"),
      requires_foreign_language: z.boolean().optional().describe("E3: Foreign language"),
      requires_history: z.boolean().optional().describe("E3: History"),
      requires_physical_education: z.boolean().optional().describe("E3: Physical education"),
      requires_humanities: z.boolean().optional().describe("E3: Humanities"),
      requires_intensive_writing: z.boolean().optional().describe("E3: Intensive writing"),
      requires_mathematics: z.boolean().optional().describe("E3: Mathematics"),
      requires_philosophy: z.boolean().optional().describe("E3: Philosophy"),
      requires_sciences: z.boolean().optional().describe("E3: Sciences (biological or physical)"),
      requires_social_science: z.boolean().optional().describe("E3: Social science"),
      other: z.string().optional().describe("E3: Other (describe):"),
    })
    .describe("E3: Areas in which all or most students are required to complete some course work prior to graduation:"),
  // F1
  student_life: z
    .object({
      percent_ftfy_out_of_state_students: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("F1: Percent who are from out of state (exclude international/nonresidents from the numerator and denominator), First-time, first-year students, from 0% to 100%"),
      percent_undergraduates_out_of_state_students: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("F1: Percent who are from out of state (exclude international/nonresidents from the numerator and denominator), Undergraduate students, from 0% to 100%"),
      percent_ftfy_men_fraternities: z.number().min(0).max(100).optional().describe("F1: Percent of men who join fraternities, First-time, first-year students, from 0% to 100%"),
      percent_undergraduates_men_fraternities: z.number().min(0).max(100).optional().describe("F1: Percent of men who join fraternities, Undergraduate students, from 0% to 100%"),
      percent_ftfy_women_sororities: z.number().min(0).max(100).optional().describe("F1: Percent of women who join sororities, First-time, first-year students, from 0% to 100%"),
      percent_undergraduates_women_sororities: z.number().min(0).max(100).optional().describe("F1: Percent of women who join sororities, Undergraduate students, from 0% to 100%"),
      percent_ftfy_college_owned_housing: z.number().min(0).max(100).optional().describe("F1: Percent who live in college-owned, -operated, or -affiliated housing, First-time, first-year students, from 0% to 100%"),
      percent_undergraduates_college_owned_housing: z.number().min(0).max(100).optional().describe("F1: Percent who live in college-owned, -operated, or -affiliated housing, Undergraduate students, from 0% to 100%"),
      percent_ftfy_live_off_campus: z.number().min(0).max(100).optional().describe("F1: Percent who live off campus or commute, First-time, first-year students, from 0% to 100%"),
      percent_undergraduates_live_off_campus: z.number().min(0).max(100).optional().describe("F1: Percent who live off campus or commute, Undergraduate students, from 0% to 100%"),
      percent_ftfy_age_25_or_older: z.number().min(0).max(100).optional().describe("F1: Percent of students age 25 and older, First-time, first-year students, from 0% to 100%"),
      percent_undergraduates_age_25_or_older: z.number().min(0).max(100).optional().describe("F1: Percent of students age 25 and older, Undergraduate students, from 0% to 100%"),
      average_age_of_full_time_ftfy_students: z.number().optional().describe("F1: Average age of full-time students, First-time, first-year students"),
      average_age_of_full_time_undergraduates_students: z.number().optional().describe("F1: Average age of full-time students, Undergraduate students"),
      average_age_of_all_ftfy_students: z.number().optional().describe("F1: Average age of all students (full- and part-time), First-time, first-year students"),
      average_age_of_all_undergraduates_students: z.number().optional().describe("F1: Average age of all students (full- and part-time), Undergraduate students"),
    })
    .describe("F1: Percentages of first-time, first-year degree-seeking students and degree-seeking undergraduates enrolled in Fall who fit the following categories"),
  // F2
  activities_offered: z
    .object({
      has_campus_ministries: z.boolean().optional().describe("F2: Campus ministries"),
      has_choral_groups: z.boolean().optional().describe("F2: Choral groups"),
      has_concert_band: z.boolean().optional().describe("F2: Concert band"),
      has_dance: z.boolean().optional().describe("F2: Dance"),
      has_drama_theater: z.boolean().optional().describe("F2: Drama/theater"),
      has_international_student_organization: z.boolean().optional().describe("F2: International student organization"),
      has_jazz_band: z.boolean().optional().describe("F2: Jazz band"),
      has_literary_magazine: z.boolean().optional().describe("F2: Literary magazine"),
      has_marching_band: z.boolean().optional().describe("F2: Marching band"),
      has_model_un: z.boolean().optional().describe("F2: Model UN"),
      has_music_ensembles: z.boolean().optional().describe("F2: Music ensembles"),
      has_musical_theater: z.boolean().optional().describe("F2: Musical theater"),
      has_opera: z.boolean().optional().describe("F2: Opera"),
      has_pep_band: z.boolean().optional().describe("F2: Pep band"),
      has_radio_station: z.boolean().optional().describe("F2: Radio station"),
      has_student_government: z.boolean().optional().describe("F2: Student government"),
      has_student_newspaper: z.boolean().optional().describe("F2: Student newspaper"),
      has_student_run_film_society: z.boolean().optional().describe("F2: Student-run film society"),
      has_symphony_orchestra: z.boolean().optional().describe("F2: Symphony orchestra"),
      has_television_station: z.boolean().optional().describe("F2: Television station"),
      has_yearbook: z.boolean().optional().describe("F2: Yearbook"),
    })
    .describe("F2: Activities offered"),
  // F3
  rotc: z
    .object({
      offers_army_rotc_marine_option: z.boolean().optional().describe("F3: Army ROTC is offered: Marine Option (for Naval ROTC)"),
      offers_army_rotc_on_campus: z.boolean().optional().describe("F3: Army ROTC is offered: On Campus"),
      offers_army_rotc_at_cooperating_institution: z.boolean().optional().describe("F3: Army ROTC is offered: At Cooperating Institution"),
      army_rotc_cooperating_institution_name: z.string().optional().describe("F3: Army ROTC is offered: Name of Cooperating Institution"),
      offers_naval_rotc_marine_option: z.boolean().optional().describe("F3: Naval ROTC is offered: Marine Option (for Naval ROTC)"),
      offers_naval_rotc_on_campus: z.boolean().optional().describe("F3: Naval ROTC is offered: On Campus"),
      offers_naval_rotc_at_cooperating_institution: z.boolean().optional().describe("F3: Naval ROTC is offered: At Cooperating Institution"),
      naval_rotc_cooperating_institution_name: z.string().optional().describe("F3: Naval ROTC is offered: Name of Cooperating Institution"),
      offers_air_force_rotc_marine_option: z.boolean().optional().describe("F3: Air Force ROTC is offered: Marine Option (for Naval ROTC)"),
      offers_air_force_rotc_on_campus: z.boolean().optional().describe("F3: Air Force ROTC is offered: On Campus"),
      offers_air_force_rotc_at_cooperating_institution: z.boolean().optional().describe("F3: Air Force ROTC is offered: At Cooperating Institution"),
      air_force_rotc_cooperating_institution_name: z.string().optional().describe("F3: Air Force ROTC is offered: Name of Cooperating Institution"),
    })
    .describe("F3: ROTC (program offered in cooperation with Reserve Officers' Training Corps)"),
  // F4
  housing_options: z
    .object({
      has_coed_dorms: z.boolean().optional().describe("F4: Coed dorms"),
      has_mens_dorms: z.boolean().optional().describe("F4: Mens dorms"),
      has_womens_dorms: z.boolean().optional().describe("F4: Womens dorms"),
      has_apartments_for_married_students: z.boolean().optional().describe("F4: Apartments for married students"),
      has_apartments_for_single_students: z.boolean().optional().describe("F4: Apartments for single students"),
      has_special_housing_for_disabled_students: z.boolean().optional().describe("F4: Special housing for disabled students"),
      has_special_housing_for_international_students: z.boolean().optional().describe("F4: Special housing for international students"),
      has_fraternity_sorority_housing: z.boolean().optional().describe("F4: Fraternity/sorority housing"),
      has_cooperative_housing: z.boolean().optional().describe("F4: Cooperative housing"),
      has_theme_housing: z.boolean().optional().describe("F4: Theme housing"),
      has_wellness_housing: z.boolean().optional().describe("F4: Wellness housing"),
      has_living_learning_communities: z.boolean().optional().describe("F4: Living learning communities"),
      other_housing_options: z.string().optional().describe("F4: Other housing options (specify):"),
    })
    .describe("F4: Housing: Check all types of college-owned, -operated, or -affiliated housing available for undergraduates at your institution"),
  // G0
  net_price_calculator_url: z.string().optional().describe("G0: Please provide the URL of your institution's net price calculator"),
  // G1
  private_institutions_undergraduate_tuition: z
    .object({
      first_year_tuition: z.number().optional().describe("G1: Tuition, First-Year"),
      undergraduates_tuition: z.number().optional().describe("G1: Tuition, Undergraduates"),
    })
    .describe("G1: PRIVATE INSTITUTIONS"),
  public_institutions_undergraduate_tuition: z
    .object({
      first_year_tuition_in_district: z.number().optional().describe("G1: Tuition: In-district, First-Year"),
      undergraduates_tuition_in_district: z.number().optional().describe("G1: Tuition: In-district, Undergraduates"),
      first_year_tuition_in_state_out_of_district: z.number().optional().describe("G1: Tuition: In-state (out-of-district), First-Year"),
      undergraduates_tuition_in_state_out_of_district: z.number().optional().describe("G1: Tuition: In-state (out-of-district), Undergraduates"),
      first_year_tuition_out_of_state: z.number().optional().describe("G1: Tuition: Out-of-state, First-Year"),
      undergraduates_tuition_out_of_state: z.number().optional().describe("G1: Tuition: Out-of-state, Undergraduates"),
      first_year_tuition_non_resident: z.number().optional().describe("G1: Tuition: Non-resident, First-Year"),
      undergraduates_tuition_non_resident: z.number().optional().describe("G1: Tuition: Non-resident, Undergraduates"),
    })
    .describe("G1: PUBLIC INSTITUTIONS"),
  fees_food_and_housing: z
    .object({
      first_year_required_fees: z.number().optional().describe("G1: Required Fees, First-Year"),
      undergraduates_required_fees: z.number().optional().describe("G1: Required Fees, Undergraduates"),
      first_year_food_and_housing_on_campus: z.number().optional().describe("G1: Food and housing (on-campus), First-Year"),
      undergraduates_food_and_housing_on_campus: z.number().optional().describe("G1: Food and housing (on-campus), Undergraduates"),
      first_year_housing_only_on_campus: z.number().optional().describe("G1: Housing Only (on-campus), First-Year"),
      undergraduates_housing_only_on_campus: z.number().optional().describe("G1: Housing Only (on-campus), Undergraduates"),
      first_year_food_only_on_campus: z.number().optional().describe("G1: Food Only (on-campus meal plan), First-Year"),
      undergraduates_food_only_on_campus: z.number().optional().describe("G1: Food Only (on-campus meal plan), Undergraduates"),
    })
    .describe("G1: FOR ALL INSTITUTIONS"),
  comprehensive_tuition_and_food_and_housing_fee: z.number().optional().describe("G2: Comprehensive tuition and food and housing fee (if your college cannot provide separate tuition and food and housing fees)"),
  // G2
  min_credits_per_term_for_full_time_tuition: z.number().optional().describe("G2: Number of credits per term a student can take for the stated full-time tuition, Minimum"),
  max_credits_per_term_for_full_time_tuition: z.number().optional().describe("G2: Number of credits per term a student can take for the stated full-time tuition, Maximum"),
  // G3
  tuition_and_fees_vary_by_year_of_study: z.boolean().optional().describe("G3: Do tuition and fees vary by year of study?"),
  // G4
  tuition_and_fees_vary_by_program: z.boolean().optional().describe("G4: Do tuition and fees vary by undergraduate instructional program?"),
  // G5
  estimated_expenses_full_time_undergraduates: z
    .object({
      residents_books_and_supplies: z.number().optional().describe("G5: Residents: Books and supplies"),
      commuters_at_home_books_and_supplies: z.number().optional().describe("G5: Commuters (living at home): Books and supplies"),
      commuters_not_at_home_books_and_supplies: z.number().optional().describe("G5: Commuters (not living at home): Books and supplies"),
      residents_housing_only: z.number().optional().describe("G5: Residents: Housing only"),
      commuters_at_home_housing_only: z.number().optional().describe("G5: Commuters (living at home): Housing only"),
      commuters_not_at_home_housing_only: z.number().optional().describe("G5: Commuters (not living at home): Housing only"),
      residents_food_only: z.number().optional().describe("G5: Residents: Food only"),
      commuters_at_home_food_only: z.number().optional().describe("G5: Commuters (living at home): Food only"),
      commuters_not_at_home_food_only: z.number().optional().describe("G5: Commuters (not living at home): Food only"),
      residents_food_and_housing_total: z.number().optional().describe("G5: Residents: Food and housing total"),
      commuters_at_home_food_and_housing_total: z.number().optional().describe("G5: Commuters (living at home): Food and housing total"),
      commuters_not_at_home_food_and_housing_total: z.number().optional().describe("G5: Commuters (not living at home): Food and housing total"),
      residents_transportation: z.number().optional().describe("G5: Residents: Transportation"),
      commuters_at_home_transportation: z.number().optional().describe("G5: Commuters (living at home): Transportation"),
      commuters_not_at_home_transportation: z.number().optional().describe("G5: Commuters (not living at home): Transportation"),
      residents_other_expenses: z.number().optional().describe("G5: Residents: Other expenses"),
      commuters_at_home_other_expenses: z.number().optional().describe("G5: Commuters (living at home): Other expenses"),
      commuters_not_at_home_other_expenses: z.number().optional().describe("G5: Commuters (not living at home): Other expenses"),
    })
    .describe("G5: Provide the estimated expenses for a typical full-time undergraduate student"),
  // G6
  per_credit_hour_tuition: z
    .object({
      private_institutions: z.number().optional().describe("G6: PRIVATE INSTITUTIONS"),
      public_institutions_in_district: z.number().optional().describe("G6: PUBLIC INSTITUTIONS: In-district"),
      public_institutions_in_state_out_of_district: z.number().optional().describe("G6: PUBLIC INSTITUTIONS: In-state (out-of-district)"),
      public_institutions_out_of_state: z.number().optional().describe("G6: PUBLIC INSTITUTIONS: Out-of-state"),
      non_resident: z.number().optional().describe("G6: NONRESIDENTS:"),
    })
    .describe("G6: Undergraduate per-credit-hour charges (tuition only)"),
  // H2
  number_of_enrolled_students_awarded_aid: z
    .object({
      // A
      number_of_ftfy_students: z.number().optional().describe("H2: Row A: Number of degree-seeking undergraduate students | Col: First-time Full-Time First-year Students"),
      number_of_full_time_undergraduate_students: z.number().optional().describe("H2: Row A: Number of degree-seeking undergraduate students | Col: Full-time Undergrad (Incl. First-Year)"),
      number_of_part_time_undergraduate_students: z.number().optional().describe("H2: Row A: Number of degree-seeking undergraduate students | Col: Less Than Full-time Undergrad"),
      // B
      number_of_ftfy_students_applied_for_aid: z.number().optional().describe("H2: Row B: Number of students in line a who applied for need-based financial aid | Col: First-time Full-Time First-year Students"),
      number_of_full_time_undergraduate_students_applied_for_aid: z.number().optional().describe("H2: Row B: Number of students in line a who applied for need-based financial aid | Col: Full-time Undergrad (Incl. First-Year)"),
      number_of_part_time_undergraduate_students_applied_for_aid: z.number().optional().describe("H2: Row B: Number of students in line a who applied for need-based financial aid | Col: Less Than Full-time Undergrad"),
      // C
      number_of_ftfy_students_with_financial_need: z.number().optional().describe("H2: Row C: Number of students in line b who were determined to have financial need | Col: First-time Full-Time First-year Students"),
      number_of_full_time_undergraduate_students_with_financial_need: z.number().optional().describe("H2: Row C: Number of students in line b who were determined to have financial need | Col: Full-time Undergrad (Incl. First-Year)"),
      number_of_part_time_undergraduate_students_with_financial_need: z.number().optional().describe("H2: Row C: Number of students in line b who were determined to have financial need | Col: Less Than Full-time Undergrad"),
      // D
      number_of_ftfy_students_awarded_any_financial_aid: z.number().optional().describe("H2: Row D: Number of students in line c who were awarded any financial aid | Col: First-time Full-Time First-year Students"),
      number_of_full_time_undergraduate_students_awarded_any_financial_aid: z.number().optional().describe("H2: Row D: Number of students in line c who were awarded any financial aid | Col: Full-time Undergrad (Incl. First-Year)"),
      number_of_part_time_undergraduate_students_awarded_any_financial_aid: z.number().optional().describe("H2: Row D: Number of students in line c who were awarded any financial aid | Col: Less Than Full-time Undergrad"),
      // E
      number_of_ftfy_students_awarded_any_need_based_scholarship_or_grant_aid: z
        .number()
        .optional()
        .describe("H2: Row E: Number of students in line d who were awarded any need-based scholarship or grant aid | Col: First-time Full-Time First-year Students"),
      number_of_full_time_undergraduate_students_awarded_any_need_based_scholarship_or_grant_aid: z
        .number()
        .optional()
        .describe("H2: Row E: Number of students in line d who were awarded any need-based scholarship or grant aid | Col: Full-time Undergrad (Incl. First-Year)"),
      number_of_part_time_undergraduate_students_awarded_any_need_based_scholarship_or_grant_aid: z
        .number()
        .optional()
        .describe("H2: Row E: Number of students in line d who were awarded any need-based scholarship or grant aid | Col: Less Than Full-time Undergrad"),
      // F
      number_of_ftfy_students_awarded_any_need_based_self_help_aid: z.number().optional().describe("H2: Row F: Number of students in line d who were awarded any need-based self-help aid | Col: First-time Full-Time First-year Students"),
      number_of_full_time_undergraduate_students_awarded_any_need_based_self_help_aid: z
        .number()
        .optional()
        .describe("H2: Row F: Number of students in line d who were awarded any need-based self-help aid | Col: Full-time Undergrad (Incl. First-Year)"),
      number_of_part_time_undergraduate_students_awarded_any_need_based_self_help_aid: z
        .number()
        .optional()
        .describe("H2: Row F: Number of students in line d who were awarded any need-based self-help aid | Col: Less Than Full-time Undergrad"),
      // G
      number_of_ftfy_students_awarded_any_non_need_based_scholarship_or_grant_aid: z
        .number()
        .optional()
        .describe("H2: Row G: Number of students in line d who were awarded any non-need-based scholarship or grant aid | Col: First-time Full-Time First-year Students"),
      number_of_full_time_undergraduate_students_awarded_any_non_need_based_scholarship_or_grant_aid: z
        .number()
        .optional()
        .describe("H2: Row G: Number of students in line d who were awarded any non-need-based scholarship or grant aid | Col: Full-time Undergrad (Incl. First-Year)"),
      number_of_part_time_undergraduate_students_awarded_any_non_need_based_scholarship_or_grant_aid: z
        .number()
        .optional()
        .describe("H2: Row G: Number of students in line d who were awarded any non-need-based scholarship or grant aid | Col: Less Than Full-time Undergrad"),
      // H
      number_of_ftfy_students_need_fully_met: z.number().optional().describe("H2: Row H: Number of students in line d whose need was fully met | Col: First-time Full-Time First-year Students"),
      number_of_full_time_undergraduate_students_need_fully_met: z.number().optional().describe("H2: Row H: Number of students in line d whose need was fully met | Col: Full-time Undergrad (Incl. First-Year)"),
      number_of_part_time_undergraduate_students_need_fully_met: z.number().optional().describe("H2: Row H: Number of students in line d whose need was fully met | Col: Less Than Full-time Undergrad"),
      // I
      avg_pct_need_met_for_ftfy_students: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("H2: Row I: On average, the percentage of need that was met of students who were awarded any need-based aid | Col: First-time Full-Time First-year Students"),
      avg_pct_need_met_for_full_time_undergraduate_students: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("H2: Row I: On average, the percentage of need that was met of students who were awarded any need-based aid | Col: Full-time Undergrad (Incl. First-Year)"),
      avg_pct_need_met_for_part_time_undergraduate_students: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("H2: Row I: On average, the percentage of need that was met of students who were awarded any need-based aid | Col: Less Than Full-time Undergrad"),
      // J
      avg_financial_aid_package_for_ftfy_students: z.number().optional().describe("H2: Row J: The average financial aid package of those in line d | Col: First-time Full-Time First-year Students"),
      avg_financial_aid_package_for_full_time_undergraduate_students: z.number().optional().describe("H2: Row J: The average financial aid package of those in line d | Col: Full-time Undergrad (Incl. First-Year)"),
      avg_financial_aid_package_for_part_time_undergraduate_students: z.number().optional().describe("H2: Row J: The average financial aid package of those in line d | Col: Less Than Full-time Undergrad"),
      // K
      avg_need_based_scholarship_and_grant_award_for_ftfy_students: z.number().optional().describe("H2: Row K: Average need-based scholarship and grant award of those in line e | Col: First-time Full-Time First-year Students"),
      avg_need_based_scholarship_and_grant_award_for_full_time_undergraduate_students: z
        .number()
        .optional()
        .describe("H2: Row K: Average need-based scholarship and grant award of those in line e | Col: Full-time Undergrad (Incl. First-Year)"),
      avg_need_based_scholarship_and_grant_award_for_part_time_undergraduate_students: z.number().optional().describe("H2: Row K: Average need-based scholarship and grant award of those in line e | Col: Less Than Full-time Undergrad"),
      // L
      avg_need_based_self_help_award_for_ftfy_students: z.number().optional().describe("H2: Row L: Average need-based self help award | Col: First-time Full-Time First-year Students"),
      avg_need_based_self_help_award_for_full_time_undergraduate_students: z.number().optional().describe("H2: Row L: Average need-based self help award | Col: Full-time Undergrad (Incl. First-Year)"),
      avg_need_based_self_help_award_for_part_time_undergraduate_students: z.number().optional().describe("H2: Row L: Average need-based self help award | Col: Less Than Full-time Undergrad"),
      // M
      avg_need_based_loan_for_ftfy_students: z.number().optional().describe("H2: Row M: Average need-based loan | Col: First-time Full-Time First-year Students"),
      avg_need_based_loan_for_full_time_undergraduate_students: z.number().optional().describe("H2: Row M: Average need-based loan | Col: Full-time Undergrad (Incl. First-Year)"),
      avg_need_based_loan_for_part_time_undergraduate_students: z.number().optional().describe("H2: Row M: Average need-based loan | Col: Less Than Full-time Undergrad"),
    })
    .describe("H2: Number of Enrolled Students Awarded Aid"),
  // H2A
  number_of_enrolled_students_awarded_non_need_based_aid: z
    .object({
      // N
      number_of_ftfy_students_awarded_merit_aid: z
        .number()
        .optional()
        .describe(
          "H2: Row N: Number of students in line a who had no financial need and who were awarded institutional non-need-based scholarship or grant aid (exclude those who were awarded athletic awards and tuition benefits) | Col: First-time Full-Time First-year Students",
        ),
      number_of_full_time_undergraduate_students_awarded_merit_aid: z
        .number()
        .optional()
        .describe(
          "H2: Row N: Number of students in line a who had no financial need and who were awarded institutional non-need-based scholarship or grant aid (exclude those who were awarded athletic awards and tuition benefits) | Col: Full-time Undergrad (Incl. First-Year)",
        ),
      number_of_part_time_undergraduate_students_awarded_merit_aid: z
        .number()
        .optional()
        .describe(
          "H2: Row N: Number of students in line a who had no financial need and who were awarded institutional non-need-based scholarship or grant aid (exclude those who were awarded athletic awards and tuition benefits) | Col: Less Than Full-time Undergrad",
        ),
      // O
      avg_merit_aid_for_ftfy_students: z
        .number()
        .optional()
        .describe("H2: Row O: Average dollar amount of institutional non-need-based scholarship and grant aid awarded to students in line n | Col: First-time Full-Time First-year Students"),
      avg_merit_aid_for_full_time_undergraduate_students: z
        .number()
        .optional()
        .describe("H2: Row O: non-need-based scholarship and grant aid non-need-based scholarship and grant aid awarded to students in line n | Col: Full-time Undergrad (Incl. First-Year)"),
      avg_merit_aid_for_part_time_undergraduate_students: z.number().optional().describe("H2: Row O: awarded to students in line non-need-based scholarship and grant aid awarded to students in line n | Col: Less Than Full-time Undergrad"),
      // P
      number_of_ftfy_students_awarded_athletic_scholarship: z
        .number()
        .optional()
        .describe("H2: Row P: Number of students in line a who were awarded an institutional non-need-based athletic scholarship or grant | Col: First-time Full-Time First-year Students"),
      number_of_full_time_undergraduate_students_awarded_athletic_scholarship: z
        .number()
        .optional()
        .describe("H2: Row P: Number of students in line a who were awarded an institutional non-need-based athletic scholarship or grant | Col: Full-time Undergrad (Incl. First-Year)"),
      number_of_part_time_undergraduate_students_awarded_athletic_scholarship: z
        .number()
        .optional()
        .describe("H2: Row P: Number of students in line a who were awarded an institutional non-need-based athletic scholarship or grant | Col: Less Than Full-time Undergrad"),
      // Q
      avg_athletic_scholarship_for_ftfy_students: z
        .number()
        .optional()
        .describe("H2: Row Q: Average dollar amount of institutional non-need-based athletic scholarships and grants awarded to students in line p | Col: First-time Full-Time First-year Students"),
      avg_athletic_scholarship_for_full_time_undergraduate_students: z
        .number()
        .optional()
        .describe("H2: Row Q: Average dollar amount of institutional non-need-based athletic scholarships and grants awarded to students in line p | Col: Full-time Undergrad (Incl. First-Year)"),
      avg_athletic_scholarship_for_part_time_undergraduate_students: z
        .number()
        .optional()
        .describe("H2: Row Q: Average dollar amount of institutional non-need-based athletic scholarships and grants awarded to students in line p | Col: Less Than Full-time Undergrad"),
    })
    .describe("H2A: Number of Enrolled Students Awarded Non-need-based Scholarships and Grants"),
  // H4
  number_of_bachelors_graduates: z
    .number()
    .optional()
    .describe("H4: Provide the number of students who started at your institution as first-time students and received a bachelor's degree. Exclude students who transferred into your institution."),
  // H6
  has_institutional_need_based_scholarship_or_grant_aid_for_nonresidents: z.boolean().optional().describe("H6: Institutional need-based scholarship or grant aid is available"),
  has_institutional_non_need_based_scholarship_or_grant_aid_for_nonresidents: z.boolean().optional().describe("H6: Institutional non-need-based scholarship or grant aid is available"),
  has_no_institutional_scholarship_or_grant_aid_for_nonresidents: z.boolean().optional().describe("H6: Institutional scholarship or grant aid is not available"),
  // I1
  instructional_faculty: z
    .object({
      total_number_of_instructional_faculty_full_time: z.number().optional().describe("I1: Row A: Total number of instructional faculty | Full-Time"),
      total_number_of_instructional_faculty_part_time: z.number().optional().describe("I1: Row A: Total number of instructional faculty | Part-Time"),
      total_number_of_instructional_faculty_total: z.number().optional().describe("I1: Row A: Total number of instructional faculty | Total"),
      members_of_minority_groups_full_time: z.number().optional().describe("I1: Row B: Total number who are members of minority groups | Full-Time"),
      members_of_minority_groups_part_time: z.number().optional().describe("I1: Row B: Total number who are members of minority groups | Part-Time"),
      members_of_minority_groups_total: z.number().optional().describe("I1: Row B: Total number who are members of minority groups | Total"),
      females_full_time: z.number().optional().describe("I1: Row C: Total number who are females | Full-Time"),
      females_part_time: z.number().optional().describe("I1: Row C: Total number who are females | Part-Time"),
      females_total: z.number().optional().describe("I1: Row C: Total number who are females | Total"),
      males_full_time: z.number().optional().describe("I1: Row D: Total number who are males | Full-Time"),
      males_part_time: z.number().optional().describe("I1: Row D: Total number who are males | Part-Time"),
      males_total: z.number().optional().describe("I1: Row D: Total number who are males | Total"),
      nonresidents_international_full_time: z.number().optional().describe("I1: Row E: Total number who are nonresidents (international) | Full-Time"),
      nonresidents_international_part_time: z.number().optional().describe("I1: Row E: Total number who are nonresidents (international) | Part-Time"),
      nonresidents_international_total: z.number().optional().describe("I1: Row E: Total number who are nonresidents (international) | Total"),
      doctorate_or_terminal_degree_full_time: z.number().optional().describe("I1: Row F: Total number with doctorate, or other terminal degree | Full-Time"),
      doctorate_or_terminal_degree_part_time: z.number().optional().describe("I1: Row F: Total number with doctorate, or other terminal degree | Part-Time"),
      doctorate_or_terminal_degree_total: z.number().optional().describe("I1: Row F: Total number with doctorate, or other terminal degree | Total"),
      masters_not_terminal_full_time: z.number().optional().describe("I1: Row G: Total number whose highest degree is a master's but not a terminal master's | Full-Time"),
      masters_not_terminal_part_time: z.number().optional().describe("I1: Row G: Total number whose highest degree is a master's but not a terminal master's | Part-Time"),
      masters_not_terminal_total: z.number().optional().describe("I1: Row G: Total number whose highest degree is a master's but not a terminal master's | Total"),
      bachelors_full_time: z.number().optional().describe("I1: Row H: Total number whose highest degree is a bachelor's | Full-Time"),
      bachelors_part_time: z.number().optional().describe("I1: Row H: Total number whose highest degree is a bachelor's | Part-Time"),
      bachelors_total: z.number().optional().describe("I1: Row H: Total number whose highest degree is a bachelor's | Total"),
      unknown_or_other_full_time: z.number().optional().describe("I1: Row I: Total number whose highest degree is unknown or other | Full-Time"),
      unknown_or_other_part_time: z.number().optional().describe("I1: Row I: Total number whose highest degree is unknown or other | Part-Time"),
      unknown_or_other_total: z.number().optional().describe("I1: Row I: Total number whose highest degree is unknown or other | Total"),
      standalone_graduate_professional_programs_full_time: z.number().optional().describe("I1: Row J: Total number in stand-alone graduate/professional programs in which faculty teach virtually only graduate-level students | Full-Time"),
      standalone_graduate_professional_programs_part_time: z.number().optional().describe("I1: Row J: Total number in stand-alone graduate/professional programs in which faculty teach virtually only graduate-level students | Part-Time"),
      standalone_graduate_professional_programs_total: z.number().optional().describe("I1: Row J: Total number in stand-alone graduate/professional programs in which faculty teach virtually only graduate-level students | Total"),
    })
    .describe("I1: Instructional Faculty"),

  // I2
  student_to_faculty_ratio: z
    .object({
      ratio: z.number().optional().describe("I2: Student to Faculty Ratio"),
      number_students: z.number().optional().describe("I2: (based on [number] students"),
      number_faculty: z.number().optional().describe("I2: and [number] faculty"),
    })
    .describe("I2: Student To Faculty Ratio"),
  // I3
  undergraduate_class_size: z
    .object({
      class_sections_2_to_9: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SECTIONS | 2-9"),
      class_sections_10_to_19: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SECTIONS | 10-19"),
      class_sections_20_to_29: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SECTIONS | 20-29"),
      class_sections_30_to_39: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SECTIONS | 30-39"),
      class_sections_40_to_49: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SECTIONS | 40-49"),
      class_sections_50_to_99: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SECTIONS | 50-99"),
      class_sections_100_plus: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SECTIONS | 100+"),
      class_sections_total: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SECTIONS | Total"),
      class_sub_sections_2_to_9: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SUB-SECTIONS | 2-9"),
      class_sub_sections_10_to_19: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SUB-SECTIONS | 10-19"),
      class_sub_sections_20_to_29: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SUB-SECTIONS | 20-29"),
      class_sub_sections_30_to_39: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SUB-SECTIONS | 30-39"),
      class_sub_sections_40_to_49: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SUB-SECTIONS | 40-49"),
      class_sub_sections_50_to_99: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SUB-SECTIONS | 50-99"),
      class_sub_sections_100_plus: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SUB-SECTIONS | 100+"),
      class_sub_sections_total: z.number().optional().describe("I3: Undergraduate Class Size (provide numbers) | CLASS SUB-SECTIONS | Total"),
    })
    .describe("I3: Number of Class Sections with Undergraduates Enrolled"),
  // J1
  agriculture_degrees_conferred: z
    .object({
      agriculture_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Agriculture | Diploma/Certificates | as percentage, from 0% to 100%"),
      agriculture_associate: z.number().min(0).max(100).optional().describe("J1: Agriculture | Associate | as percentage, from 0% to 100%"),
      agriculture_bachelors: z.number().min(0).max(100).optional().describe("J1: Agriculture | Bachelor's | as percentage, from 0% to 100%"),
      agriculture_cip_2020_categories: z.array(z.string()).describe("J1: Agriculture | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  natural_resources_and_conservation_degrees_conferred: z
    .object({
      natural_resources_and_conservation_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Natural resources and conservation | Diploma/Certificates | as percentage, from 0% to 100%"),
      natural_resources_and_conservation_associate: z.number().min(0).max(100).optional().describe("J1: Natural resources and conservation | Associate | as percentage, from 0% to 100%"),
      natural_resources_and_conservation_bachelors: z.number().min(0).max(100).optional().describe("J1: Natural resources and conservation | Bachelor's | as percentage, from 0% to 100%"),
      natural_resources_and_conservation_cip_2020_categories: z.array(z.string()).describe("J1: Natural resources and conservation | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  architecture_degrees_conferred: z
    .object({
      architecture_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Architecture | Diploma/Certificates | as percentage, from 0% to 100%"),
      architecture_associate: z.number().min(0).max(100).optional().describe("J1: Architecture | Associate | as percentage, from 0% to 100%"),
      architecture_bachelors: z.number().min(0).max(100).optional().describe("J1: Architecture | Bachelor's | as percentage, from 0% to 100%"),
      architecture_cip_2020_categories: z.array(z.string()).describe("J1: Architecture | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  area_ethnic_and_gender_studies_degrees_conferred: z
    .object({
      area_ethnic_and_gender_studies_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Area, ethnic, and gender studies | Diploma/Certificates | as percentage, from 0% to 100%"),
      area_ethnic_and_gender_studies_associate: z.number().min(0).max(100).optional().describe("J1: Area, ethnic, and gender studies | Associate | as percentage, from 0% to 100%"),
      area_ethnic_and_gender_studies_bachelors: z.number().min(0).max(100).optional().describe("J1: Area, ethnic, and gender studies | Bachelor's | as percentage, from 0% to 100%"),
      area_ethnic_and_gender_studies_cip_2020_categories: z.array(z.string()).describe("J1: Area, ethnic, and gender studies | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  communication_journalism_degrees_conferred: z
    .object({
      communication_journalism_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Communication/journalism | Diploma/Certificates | as percentage, from 0% to 100%"),
      communication_journalism_associate: z.number().min(0).max(100).optional().describe("J1: Communication/journalism | Associate | as percentage, from 0% to 100%"),
      communication_journalism_bachelors: z.number().min(0).max(100).optional().describe("J1: Communication/journalism | Bachelor's | as percentage, from 0% to 100%"),
      communication_journalism_cip_2020_categories: z.array(z.string()).describe("J1: Communication/journalism | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  communication_technologies_degrees_conferred: z
    .object({
      communication_technologies_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Communication technologies | Diploma/Certificates | as percentage, from 0% to 100%"),
      communication_technologies_associate: z.number().min(0).max(100).optional().describe("J1: Communication technologies | Associate | as percentage, from 0% to 100%"),
      communication_technologies_bachelors: z.number().min(0).max(100).optional().describe("J1: Communication technologies | Bachelor's | as percentage, from 0% to 100%"),
      communication_technologies_cip_2020_categories: z.array(z.string()).describe("J1: Communication technologies | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  computer_information_sciences_degrees_conferred: z
    .object({
      computer_information_sciences_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Computer and information sciences | Diploma/Certificates | as percentage, from 0% to 100%"),
      computer_information_sciences_associate: z.number().min(0).max(100).optional().describe("J1: Computer and information sciences | Associate | as percentage, from 0% to 100%"),
      computer_information_sciences_bachelors: z.number().min(0).max(100).optional().describe("J1: Computer and information sciences | Bachelor's | as percentage, from 0% to 100%"),
      computer_information_sciences_cip_2020_categories: z.array(z.string()).describe("J1: Computer and information sciences | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  personal_culinary_services_degrees_conferred: z
    .object({
      personal_culinary_services_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Personal and culinary services | Diploma/Certificates | as percentage, from 0% to 100%"),
      personal_culinary_services_associate: z.number().min(0).max(100).optional().describe("J1: Personal and culinary services | Associate | as percentage, from 0% to 100%"),
      personal_culinary_services_bachelors: z.number().min(0).max(100).optional().describe("J1: Personal and culinary services | Bachelor's | as percentage, from 0% to 100%"),
      personal_culinary_services_cip_2020_categories: z.array(z.string()).describe("J1: Personal and culinary services | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  education_degrees_conferred: z
    .object({
      education_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Education | Diploma/Certificates | as percentage, from 0% to 100%"),
      education_associate: z.number().min(0).max(100).optional().describe("J1: Education | Associate | as percentage, from 0% to 100%"),
      education_bachelors: z.number().min(0).max(100).optional().describe("J1: Education | Bachelor's | as percentage, from 0% to 100%"),
      education_cip_2020_categories: z.array(z.string()).describe("J1: Education | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  engineering_degrees_conferred: z
    .object({
      engineering_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Engineering | Diploma/Certificates | as percentage, from 0% to 100%"),
      engineering_associate: z.number().min(0).max(100).optional().describe("J1: Engineering | Associate | as percentage, from 0% to 100%"),
      engineering_bachelors: z.number().min(0).max(100).optional().describe("J1: Engineering | Bachelor's | as percentage, from 0% to 100%"),
      engineering_cip_2020_categories: z.array(z.string()).describe("J1: Engineering | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  engineering_technology_degrees_conferred: z
    .object({
      engineering_technology_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Engineering Technology | Diploma/Certificates | as percentage, from 0% to 100%"),
      engineering_technology_associate: z.number().min(0).max(100).optional().describe("J1: Engineering Technology | Associate | as percentage, from 0% to 100%"),
      engineering_technology_bachelors: z.number().min(0).max(100).optional().describe("J1: Engineering Technology | Bachelor's | as percentage, from 0% to 100%"),
      engineering_technology_cip_2020_categories: z.array(z.string()).describe("J1: Engineering Technology | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  foreign_languages_literatures_and_linguistics_degrees_conferred: z
    .object({
      foreign_languages_literatures_and_linguistics_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Foreign languages, literatures, and linguistics | Diploma/Certificates | as percentage, from 0% to 100%"),
      foreign_languages_literatures_and_linguistics_associate: z.number().min(0).max(100).optional().describe("J1: Foreign languages, literatures, and linguistics | Associate | as percentage, from 0% to 100%"),
      foreign_languages_literatures_and_linguistics_bachelors: z.number().min(0).max(100).optional().describe("J1: Foreign languages, literatures, and linguistics | Bachelor's | as percentage, from 0% to 100%"),
      foreign_languages_literatures_and_linguistics_cip_2020_categories: z.array(z.string()).describe("J1: Foreign languages, literatures, and linguistics | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  family_and_consumer_sciences_degrees_conferred: z
    .object({
      family_and_consumer_sciences_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Family and consumer sciences | Diploma/Certificates | as percentage, from 0% to 100%"),
      family_and_consumer_sciences_associate: z.number().min(0).max(100).optional().describe("J1: Family and consumer sciences | Associate | as percentage, from 0% to 100%"),
      family_and_consumer_sciences_bachelors: z.number().min(0).max(100).optional().describe("J1: Family and consumer sciences | Bachelor's | as percentage, from 0% to 100%"),
      family_and_consumer_sciences_cip_2020_categories: z.array(z.string()).describe("J1: Family and consumer sciences | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  law_legal_studies_degrees_conferred: z
    .object({
      law_legal_studies_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Law/legal studies | Diploma/Certificates | as percentage, from 0% to 100%"),
      law_legal_studies_associate: z.number().min(0).max(100).optional().describe("J1: Law/legal studies | Associate | as percentage, from 0% to 100%"),
      law_legal_studies_bachelors: z.number().min(0).max(100).optional().describe("J1: Law/legal studies | Bachelor's | as percentage, from 0% to 100%"),
      law_legal_studies_cip_2020_categories: z.array(z.string()).describe("J1: Law/legal studies | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  english_degrees_conferred: z
    .object({
      english_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: English | Diploma/Certificates | as percentage, from 0% to 100%"),
      english_associate: z.number().min(0).max(100).optional().describe("J1: English | Associate | as percentage, from 0% to 100%"),
      english_bachelors: z.number().min(0).max(100).optional().describe("J1: English | Bachelor's | as percentage, from 0% to 100%"),
      english_cip_2020_categories: z.array(z.string()).describe("J1: English | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  liberal_arts_general_studies_degrees_conferred: z
    .object({
      liberal_arts_general_studies_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Liberal arts/general studies | Diploma/Certificates | as percentage, from 0% to 100%"),
      liberal_arts_general_studies_associate: z.number().min(0).max(100).optional().describe("J1: Liberal arts/general studies | Associate | as percentage, from 0% to 100%"),
      liberal_arts_general_studies_bachelors: z.number().min(0).max(100).optional().describe("J1: Liberal arts/general studies | Bachelor's | as percentage, from 0% to 100%"),
      liberal_arts_general_studies_cip_2020_categories: z.array(z.string()).describe("J1: Liberal arts/general studies | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  library_science_degrees_conferred: z
    .object({
      library_science_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Library science | Diploma/Certificates | as percentage, from 0% to 100%"),
      library_science_associate: z.number().min(0).max(100).optional().describe("J1: Library science | Associate | as percentage, from 0% to 100%"),
      library_science_bachelors: z.number().min(0).max(100).optional().describe("J1: Library science | Bachelor's | as percentage, from 0% to 100%"),
      library_science_cip_2020_categories: z.array(z.string()).describe("J1: Library science | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  biological_life_sciences_degrees_conferred: z
    .object({
      biological_life_sciences_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Biological/life sciences | Diploma/Certificates | as percentage, from 0% to 100%"),
      biological_life_sciences_associate: z.number().min(0).max(100).optional().describe("J1: Biological/life sciences | Associate | as percentage, from 0% to 100%"),
      biological_life_sciences_bachelors: z.number().min(0).max(100).optional().describe("J1: Biological/life sciences | Bachelor's | as percentage, from 0% to 100%"),
      biological_life_sciences_cip_2020_categories: z.array(z.string()).describe("J1: Biological/life sciences | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  mathematics_and_statistics_degrees_conferred: z
    .object({
      mathematics_and_statistics_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Mathematics and statistics | Diploma/Certificates | as percentage, from 0% to 100%"),
      mathematics_and_statistics_associate: z.number().min(0).max(100).optional().describe("J1: Mathematics and statistics | Associate | as percentage, from 0% to 100%"),
      mathematics_and_statistics_bachelors: z.number().min(0).max(100).optional().describe("J1: Mathematics and statistics | Bachelor's | as percentage, from 0% to 100%"),
      mathematics_and_statistics_cip_2020_categories: z.array(z.string()).describe("J1: Mathematics and statistics | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  military_science_and_military_technologies_degrees_conferred: z
    .object({
      military_science_and_military_technologies_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Military science and military technologies | Diploma/Certificates | as percentage, from 0% to 100%"),
      military_science_and_military_technologies_associate: z.number().min(0).max(100).optional().describe("J1: Military science and military technologies | Associate | as percentage, from 0% to 100%"),
      military_science_and_military_technologies_bachelors: z.number().min(0).max(100).optional().describe("J1: Military science and military technologies | Bachelor's | as percentage, from 0% to 100%"),
      military_science_and_military_technologies_cip_2020_categories: z.array(z.string()).describe("J1: Military science and military technologies | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  interdisciplinary_studies_degrees_conferred: z
    .object({
      interdisciplinary_studies_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Interdisciplinary studies | Diploma/Certificates | as percentage, from 0% to 100%"),
      interdisciplinary_studies_associate: z.number().min(0).max(100).optional().describe("J1: Interdisciplinary studies | Associate | as percentage, from 0% to 100%"),
      interdisciplinary_studies_bachelors: z.number().min(0).max(100).optional().describe("J1: Interdisciplinary studies | Bachelor's | as percentage, from 0% to 100%"),
      interdisciplinary_studies_cip_2020_categories: z.array(z.string()).describe("J1: Interdisciplinary studies | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  parks_and_recreation_degrees_conferred: z
    .object({
      parks_and_recreation_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Parks and recreation | Diploma/Certificates | as percentage, from 0% to 100%"),
      parks_and_recreation_associate: z.number().min(0).max(100).optional().describe("J1: Parks and recreation | Associate | as percentage, from 0% to 100%"),
      parks_and_recreation_bachelors: z.number().min(0).max(100).optional().describe("J1: Parks and recreation | Bachelor's | as percentage, from 0% to 100%"),
      parks_and_recreation_cip_2020_categories: z.array(z.string()).describe("J1: Parks and recreation | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  philosophy_and_religious_studies_degrees_conferred: z
    .object({
      philosophy_and_religious_studies_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Philosophy and religious studies | Diploma/Certificates | as percentage, from 0% to 100%"),
      philosophy_and_religious_studies_associate: z.number().min(0).max(100).optional().describe("J1: Philosophy and religious studies | Associate | as percentage, from 0% to 100%"),
      philosophy_and_religious_studies_bachelors: z.number().min(0).max(100).optional().describe("J1: Philosophy and religious studies | Bachelor's | as percentage, from 0% to 100%"),
      philosophy_and_religious_studies_cip_2020_categories: z.array(z.string()).describe("J1: Philosophy and religious studies | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  theology_and_religious_vocations_degrees_conferred: z
    .object({
      theology_and_religious_vocations_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Theology and religious vocations | Diploma/Certificates | as percentage, from 0% to 100%"),
      theology_and_religious_vocations_associate: z.number().min(0).max(100).optional().describe("J1: Theology and religious vocations | Associate | as percentage, from 0% to 100%"),
      theology_and_religious_vocations_bachelors: z.number().min(0).max(100).optional().describe("J1: Theology and religious vocations | Bachelor's | as percentage, from 0% to 100%"),
      theology_and_religious_vocations_cip_2020_categories: z.array(z.string()).describe("J1: Theology and religious vocations | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  physical_sciences_degrees_conferred: z
    .object({
      physical_sciences_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Physical sciences | Diploma/Certificates | as percentage, from 0% to 100%"),
      physical_sciences_associate: z.number().min(0).max(100).optional().describe("J1: Physical sciences | Associate | as percentage, from 0% to 100%"),
      physical_sciences_bachelors: z.number().min(0).max(100).optional().describe("J1: Physical sciences | Bachelor's | as percentage, from 0% to 100%"),
      physical_sciences_cip_2020_categories: z.array(z.string()).describe("J1: Physical sciences | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  science_technologies_degrees_conferred: z
    .object({
      science_technologies_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Science technologies | Diploma/Certificates | as percentage, from 0% to 100%"),
      science_technologies_associate: z.number().min(0).max(100).optional().describe("J1: Science technologies | Associate | as percentage, from 0% to 100%"),
      science_technologies_bachelors: z.number().min(0).max(100).optional().describe("J1: Science technologies | Bachelor's | as percentage, from 0% to 100%"),
      science_technologies_cip_2020_categories: z.array(z.string()).describe("J1: Science technologies | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  psychology_degrees_conferred: z
    .object({
      psychology_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Psychology | Diploma/Certificates | as percentage, from 0% to 100%"),
      psychology_associate: z.number().min(0).max(100).optional().describe("J1: Psychology | Associate | as percentage, from 0% to 100%"),
      psychology_bachelors: z.number().min(0).max(100).optional().describe("J1: Psychology | Bachelor's | as percentage, from 0% to 100%"),
      psychology_cip_2020_categories: z.array(z.string()).describe("J1: Psychology | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  homeland_security_law_enforcement_firefighting_and_protective_services_degrees_conferred: z
    .object({
      homeland_security_law_enforcement_firefighting_and_protective_services_diplomas_certificates: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("J1: Homeland Security, law enforcement, firefighting, and protective services | Diploma/Certificates | as percentage, from 0% to 100%"),
      homeland_security_law_enforcement_firefighting_and_protective_services_associate: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("J1: Homeland Security, law enforcement, firefighting, and protective services | Associate | as percentage, from 0% to 100%"),
      homeland_security_law_enforcement_firefighting_and_protective_services_bachelors: z
        .number()
        .min(0)
        .max(100)
        .optional()
        .describe("J1: Homeland Security, law enforcement, firefighting, and protective services | Bachelor's | as percentage, from 0% to 100%"),
      homeland_security_law_enforcement_firefighting_and_protective_services_cip_2020_categories: z
        .array(z.string())
        .describe("J1: Homeland Security, law enforcement, firefighting, and protective services | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  public_administration_and_social_services_degrees_conferred: z
    .object({
      public_administration_and_social_services_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Public administration and social services | Diploma/Certificates | as percentage, from 0% to 100%"),
      public_administration_and_social_services_associate: z.number().min(0).max(100).optional().describe("J1: Public administration and social services | Associate | as percentage, from 0% to 100%"),
      public_administration_and_social_services_bachelors: z.number().min(0).max(100).optional().describe("J1: Public administration and social services | Bachelor's | as percentage, from 0% to 100%"),
      public_administration_and_social_services_cip_2020_categories: z.array(z.string()).describe("J1: Public administration and social services | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  social_sciences_degrees_conferred: z
    .object({
      social_sciences_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Social sciences | Diploma/Certificates | as percentage, from 0% to 100%"),
      social_sciences_associate: z.number().min(0).max(100).optional().describe("J1: Social sciences | Associate | as percentage, from 0% to 100%"),
      social_sciences_bachelors: z.number().min(0).max(100).optional().describe("J1: Social sciences | Bachelor's | as percentage, from 0% to 100%"),
      social_sciences_cip_2020_categories: z.array(z.string()).describe("J1: Social sciences | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  construction_trades_degrees_conferred: z
    .object({
      construction_trades_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Construction trades | Diploma/Certificates | as percentage, from 0% to 100%"),
      construction_trades_associate: z.number().min(0).max(100).optional().describe("J1: Construction trades | Associate | as percentage, from 0% to 100%"),
      construction_trades_bachelors: z.number().min(0).max(100).optional().describe("J1: Construction trades | Bachelor's | as percentage, from 0% to 100%"),
      construction_trades_cip_2020_categories: z.array(z.string()).describe("J1: Construction trades | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  mechanic_and_repair_technologies_degrees_conferred: z
    .object({
      mechanic_and_repair_technologies_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Mechanic and repair technologies | Diploma/Certificates | as percentage, from 0% to 100%"),
      mechanic_and_repair_technologies_associate: z.number().min(0).max(100).optional().describe("J1: Mechanic and repair technologies | Associate | as percentage, from 0% to 100%"),
      mechanic_and_repair_technologies_bachelors: z.number().min(0).max(100).optional().describe("J1: Mechanic and repair technologies | Bachelor's | as percentage, from 0% to 100%"),
      mechanic_and_repair_technologies_cip_2020_categories: z.array(z.string()).describe("J1: Mechanic and repair technologies | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  precision_production_degrees_conferred: z
    .object({
      precision_production_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Precision production | Diploma/Certificates | as percentage, from 0% to 100%"),
      precision_production_associate: z.number().min(0).max(100).optional().describe("J1: Precision production | Associate | as percentage, from 0% to 100%"),
      precision_production_bachelors: z.number().min(0).max(100).optional().describe("J1: Precision production | Bachelor's | as percentage, from 0% to 100%"),
      precision_production_cip_2020_categories: z.array(z.string()).describe("J1: Precision production | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  transportation_and_materials_moving_degrees_conferred: z
    .object({
      transportation_and_materials_moving_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Transportation and materials moving | Diploma/Certificates | as percentage, from 0% to 100%"),
      transportation_and_materials_moving_associate: z.number().min(0).max(100).optional().describe("J1: Transportation and materials moving | Associate | as percentage, from 0% to 100%"),
      transportation_and_materials_moving_bachelors: z.number().min(0).max(100).optional().describe("J1: Transportation and materials moving | Bachelor's | as percentage, from 0% to 100%"),
      transportation_and_materials_moving_cip_2020_categories: z.array(z.string()).describe("J1: Transportation and materials moving | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  visual_and_performing_arts_degrees_conferred: z
    .object({
      visual_and_performing_arts_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Visual and performing arts | Diploma/Certificates | as percentage, from 0% to 100%"),
      visual_and_performing_arts_associate: z.number().min(0).max(100).optional().describe("J1: Visual and performing arts | Associate | as percentage, from 0% to 100%"),
      visual_and_performing_arts_bachelors: z.number().min(0).max(100).optional().describe("J1: Visual and performing arts | Bachelor's | as percentage, from 0% to 100%"),
      visual_and_performing_arts_cip_2020_categories: z.array(z.string()).describe("J1: Visual and performing arts | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  health_professions_and_related_programs_degrees_conferred: z
    .object({
      health_professions_and_related_programs_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Health professions and related programs | Diploma/Certificates | as percentage, from 0% to 100%"),
      health_professions_and_related_programs_associate: z.number().min(0).max(100).optional().describe("J1: Health professions and related programs | Associate | as percentage, from 0% to 100%"),
      health_professions_and_related_programs_bachelors: z.number().min(0).max(100).optional().describe("J1: Health professions and related programs | Bachelor's | as percentage, from 0% to 100%"),
      health_professions_and_related_programs_cip_2020_categories: z.array(z.string()).describe("J1: Health professions and related programs | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  business_marketing_degrees_conferred: z
    .object({
      business_marketing_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: Business/marketing | Diploma/Certificates | as percentage, from 0% to 100%"),
      business_marketing_associate: z.number().min(0).max(100).optional().describe("J1: Business/marketing | Associate | as percentage, from 0% to 100%"),
      business_marketing_bachelors: z.number().min(0).max(100).optional().describe("J1: Business/marketing | Bachelor's | as percentage, from 0% to 100%"),
      business_marketing_cip_2020_categories: z.array(z.string()).describe("J1: Business/marketing | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
  history_degrees_conferred: z
    .object({
      history_diplomas_certificates: z.number().min(0).max(100).optional().describe("J1: History | Diploma/Certificates | as percentage, from 0% to 100%"),
      history_associate: z.number().min(0).max(100).optional().describe("J1: History | Associate | as percentage, from 0% to 100%"),
      history_bachelors: z.number().min(0).max(100).optional().describe("J1: History | Bachelor's | as percentage, from 0% to 100%"),
      history_cip_2020_categories: z.array(z.string()).describe("J1: History | CIP 2020 Categories to Include"),
    })
    .describe("J1: Degrees conferred between [date] and [date]"),
});
