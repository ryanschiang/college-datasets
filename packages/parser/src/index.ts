import { GoogleGenAI, MediaResolution } from "@google/genai";
import { env } from "./config/env.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import z from "zod/v3";
import { zodToJsonSchema } from "zod-to-json-schema";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
  });

  const filename = "stanford_cds_2024_2025.pdf";

  const fileData = await fs.readFile(path.join(__dirname, "..", "example", filename));
  const fileBlob = new Blob([fileData], { type: "application/pdf" });

  const file = await ai.files.upload({
    file: fileBlob,
    config: {
      mimeType: "application/pdf",
    },
  });
  console.log(file.uri);

  const systemInstruction = `You are a helpful assistant that parses the Common Data Set (CDS) of a university. You are given a PDF file of the CDS and a question. You need to parse the CDS and answer the question. Only return the answer, no other text. Do not explain. Do not include any other text in your response. If you cannot find the answer, return 'NOT_FOUND' and nothing else.`;

  const cache = await ai.caches.create({
    model: "gemini-3-flash-preview",
    config: {
      displayName: filename,
      ttl: "300s",
      systemInstruction,
      contents: [
        {
          role: "user",
          parts: [
            {
              fileData: {
                fileUri: file.uri,
                mimeType: file.mimeType,
              },
            },
          ],
        },
      ],
    },
  });

  const responseSchema = z.object({
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
        nonresidents_degree_seeking_undergraduates_includes_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Nonresidents"),
        nonresidents_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Nonresidents"),
        hispanic_latino_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Hispanic/Latino"),
        hispanic_latino_degree_seeking_undergraduates_includes_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Hispanic/Latino"),
        hispanic_latino_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Hispanic/Latino"),
        black_african_american_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Black or African American, non-Hispanic"),
        black_african_american_degree_seeking_undergraduates_includes_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Black or African American, non-Hispanic"),
        black_african_american_total_undergraduates_both_degree_and_non_degree_seeking: z
          .number()
          .describe("B2: Total Undergraduates (both degree & non-degree-seeking) Black or African American, non-Hispanic"),
        white_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year White, non-Hispanic"),
        white_degree_seeking_undergraduates_includes_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) White, non-Hispanic"),
        white_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) White, non-Hispanic"),
        american_indian_alaska_native_degree_seeking_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking First-Time First-Year American Indian or Alaska Native, non-Hispanic"),
        american_indian_alaska_native_degree_seeking_undergraduates_includes_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) American Indian or Alaska Native, non-Hispanic"),
        american_indian_alaska_native_total_undergraduates_both_degree_and_non_degree_seeking: z
          .number()
          .describe("B2: Total Undergraduates (both degree & non-degree-seeking) American Indian or Alaska Native, non-Hispanic"),
        asian_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Asian, non-Hispanic"),
        asian_degree_seeking_undergraduates_includes_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Asian, non-Hispanic"),
        asian_total_undergraduates_both_degree_and_non_degree_seeking: z.number().describe("B2: Total Undergraduates (both degree & non-degree-seeking) Asian, non-Hispanic"),
        native_hawaiian_pacific_islander_degree_seeking_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking First-Time First-Year Native Hawaiian or other Pacific Islander, non-Hispanic"),
        native_hawaiian_pacific_islander_degree_seeking_undergraduates_includes_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Native Hawaiian or other Pacific Islander, non-Hispanic"),
        native_hawaiian_pacific_islander_total_undergraduates_both_degree_and_non_degree_seeking: z
          .number()
          .describe("B2: Total Undergraduates (both degree & non-degree-seeking) Native Hawaiian or other Pacific Islander, non-Hispanic"),
        two_or_more_races_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Two or more races, non-Hispanic"),
        two_or_more_races_degree_seeking_undergraduates_includes_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Two or more races, non-Hispanic"),
        two_or_more_races_total_undergraduates_both_degree_and_non_degree_seeking: z
          .number()
          .describe("B2: Total Undergraduates (both degree & non-degree-seeking) Two or more races, non-Hispanic"),
        race_ethnicity_unknown_degree_seeking_first_time_first_year: z.number().describe("B2: Degree-Seeking First-Time First-Year Race and/or ethnicity unknown"),
        race_ethnicity_unknown_degree_seeking_undergraduates_includes_first_time_first_year: z
          .number()
          .describe("B2: Degree-Seeking Undergraduates (include first-time first-year) Race and/or ethnicity unknown"),
        race_ethnicity_unknown_total_undergraduates_both_degree_and_non_degree_seeking: z
          .number()
          .describe("B2: Total Undergraduates (both degree & non-degree-seeking) Race and/or ethnicity unknown"),
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
  });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [
          {
            // text: "Section B1: What is the total number of Degree-seeking, first-time first-year students that are Men?",
            text: "Section A1: What is the source of institutional control?",
          },
        ],
      },
    ],
    config: {
      mediaResolution: MediaResolution.MEDIA_RESOLUTION_HIGH,
      responseMimeType: "application/json",
      responseJsonSchema: zodToJsonSchema(responseSchema),
      cachedContent: cache.name,
    },
  });

  if (!response.text) {
    throw new Error("No response text");
  }

  const rawResponse = JSON.parse(response.text);
  console.log(rawResponse);
  const responseJson = responseSchema.parse(rawResponse);

  await fs.writeFile(path.join(__dirname, "..", "example", "response.json"), JSON.stringify(responseJson, null, 2));

  if (!response.usageMetadata) {
    throw new Error("No usage metadata");
  }

  const { promptTokenCount, candidatesTokenCount, cachedContentTokenCount, totalTokenCount, thoughtsTokenCount, toolUsePromptTokenCount } = response.usageMetadata;

  // Input cost: $0.50 per million tokens
  // Output cost: $3.00 per million tokens
  // Context caching: $0.05 (text / image / video)
  // Context caching $1.00 / 1,000,000 tokens per hour (storage price)

  const RATES = {
    INPUT: 0.5,
    OUTPUT: 3.0,
    CACHE: 0.05,
  };

  // Calculate how much of the prompt was not cached (new/uncached tokens)
  const newPromptTokenCount = (promptTokenCount ?? 0) - (cachedContentTokenCount ?? 0);

  // Charged at prompt rate
  const promptCost = ((newPromptTokenCount ?? 0) / 1_000_000) * RATES.INPUT;
  // Charged at output rate
  const candidatesCost = ((candidatesTokenCount ?? 0) / 1_000_000) * RATES.OUTPUT;
  // Charged at output rate
  const thoughtsCost = ((thoughtsTokenCount ?? 0) / 1_000_000) * RATES.OUTPUT;
  // Charged at context caching rate (discounted)
  const cachedCost = ((cachedContentTokenCount ?? 0) / 1_000_000) * RATES.CACHE;

  // Total cost
  const totalCost = promptCost + candidatesCost + thoughtsCost + cachedCost;

  console.log(`Prompt cost: $${promptCost.toFixed(6)}`);
  console.log(`Candidates cost: $${candidatesCost.toFixed(6)}`);
  console.log(`Thoughts cost: $${thoughtsCost.toFixed(6)}`);
  console.log(`Cached cost: $${cachedCost.toFixed(6)}`);
  console.log(`Total cost: $${totalCost.toFixed(6)}`);
})();
