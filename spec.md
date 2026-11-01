Here is a complete, professional Software Requirements Specification (SRS) for your AI Mystery Room project. It is designed for Spec-Driven Development (SDD), so Codex can use it as the single source of truth while building your website.

You can copy this document into a file named `SPEC.md` in your project folder.

\# AI Mystery Room\
\## Software Specification — Single Source of Truth\
\
\*\*Project Name:\*\* AI Mystery Room  \
\*\*Document Type:\*\* Product Requirements & Technical Specification  \
\*\*Development Methodology:\*\* Spec-Driven Development (SDD)  \
\*\*Frontend:\*\* React.js  \
\*\*Backend:\*\* Node.js + Express.js  \
\*\*Database:\*\* MongoDB  \
\*\*AI Provider:\*\* Google Gemini API  \
\*\*Primary Goal:\*\* Build an interactive, AI-powered mystery investigation website where users solve fictional cases by analyzing evidence and identifying the culprit.\
\
\---\
\
\# 1. Project Overview\
\
AI Mystery Room is a web application that transforms a user's short scenario or story into an interactive detective investigation.\
\
The user provides a scenario, such as a theft at a hotel, a missing valuable item, or a suspicious incident at a college. The backend uses Google Gemini AI to generate a fictional investigation with multiple suspects, motives, timelines, and evidence.\
\
Users explore the evidence room, inspect fictional chat messages, examine images or image descriptions, review simulated CCTV footage or transcripts, and connect clues to determine who committed the incident.\
\
At the end of the investigation, users select a suspect and submit their answer. The application checks the selection against the predetermined culprit and reveals the correct answer with a logical explanation.\
\
All cases and evidence are fictional and intended for entertainment and logical reasoning.\
\
\## 1.1 Product Vision\
\
Create an immersive detective experience that makes users feel like real investigators while demonstrating the practical use of generative AI in a full-stack web application.\
\
\## 1.2 Problem Statement\
\
Traditional mystery games use fixed cases with predetermined evidence. AI Mystery Room allows users to create new cases from their own story ideas, making investigations more varied and personalized.\
\
\## 1.3 Product Goals\
\
\- Generate fictional mystery cases from user-provided scenarios.\
\- Create multiple suspects with different motives and alibis.\
\- Generate consistent evidence that supports a solvable mystery.\
\- Provide an interactive investigation dashboard.\
\- Allow users to select and submit a suspected culprit.\
\- Explain the solution after submission.\
\- Deliver a responsive, secure, and easy-to-use web application.\
\
\---\
\
\# 2. Target Users\
\
The application is intended for:\
\
\- Mystery and detective-story enthusiasts.\
\- Students learning logical reasoning.\
\- Users interested in interactive AI experiences.\
\- Developers and technology enthusiasts exploring generative AI.\
\
No specialist investigation knowledge should be required.\
\
\---\
\
\# 3. Scope and Priorities\
\
\## 3.1 Minimum Viable Product (MVP)\
\
The first version must include:\
\
1\. Landing page and scenario input.\
2\. AI-powered mystery generation.\
3\. Three to four suspects per case.\
4\. Multiple evidence items per case.\
5\. Investigation dashboard.\
6\. Suspect selection.\
7\. Answer validation.\
8\. Solution reveal and explanation.\
9\. Loading, validation, and error states.\
10\. Responsive interface.\
11\. Secure Gemini API integration.\
\
\## 3.2 Future Enhancements\
\
These features are optional and must not delay the MVP:\
\
\- AI-generated evidence images.\
\- Generated video clips.\
\- Audio recordings and transcripts.\
\- User accounts and authentication.\
\- Case history and saved investigations.\
\- Timed challenges and scoring.\
\- Difficulty settings.\
\- Leaderboards.\
\- Multiplayer investigations.\
\- Achievements and badges.\
\
\*\*Scope rule:\*\* The MVP must work even if AI image or video generation is unavailable. Use textual descriptions and simulated evidence cards as fallbacks.\
\
\---\
\
\# 4. User Stories\
\
\### US-01: Create a mystery\
As a user, I want to enter a short scenario so that the application can generate a mystery based on my idea.\
\
\### US-02: Explore suspects\
As a user, I want to inspect suspect profiles so that I can understand their motives and alibis.\
\
\### US-03: Examine evidence\
As a user, I want to inspect different evidence items so that I can discover contradictions and clues.\
\
\### US-04: Investigate the case\
As a user, I want to review a timeline and compare evidence so that I can reason about what happened.\
\
\### US-05: Select a culprit\
As a user, I want to select the person I believe is responsible so that I can submit my conclusion.\
\
\### US-06: Learn the solution\
As a user, I want an explanation of the correct answer so that I understand how the clues solve the case.\
\
\### US-07: Retry after an error\
As a user, I want helpful error messages and a retry option so that a temporary AI or network failure does not end my experience.\
\
\---\
\
\# 5. Functional Requirements\
\
\## FR-01: Landing Page\
\
The landing page must contain:\
\
\- Application title: AI Mystery Room.\
\- Short description explaining the game.\
\- A text area for entering a scenario.\
\- A Generate Mystery button.\
\- Brief instructions for playing.\
\- A visible disclaimer that cases are fictional.\
\
The layout must be simple, attractive, and usable on mobile devices.\
\
\## FR-02: Scenario Input and Validation\
\
Users must be able to enter a short story or incident description.\
\
Example:\
\
"A diamond disappears from a hotel room during a party. Three guests had access to the room, and one of them is hiding something."\
\
Requirements:\
\
\- Reject empty or whitespace-only input.\
\- Enforce a configurable maximum length, initially 1,500 characters.\
\- Display helpful validation messages.\
\- Disable repeated submissions while a request is in progress.\
\- Handle unsupported or inappropriate scenario requests gracefully.\
\- Provide a way to edit the scenario and try again.\
\
\## FR-03: Mystery Generation\
\
When the user clicks Generate Mystery:\
\
1\. The frontend sends the scenario to the backend.\
2\. The backend validates the input.\
3\. The backend calls the Gemini API.\
4\. Gemini generates a structured mystery response.\
5\. The backend validates the generated data.\
6\. The backend stores the case and its private solution.\
7\. The frontend receives only the public case information.\
8\. The investigation dashboard opens.\
\
Each case must contain:\
\
\- Unique case ID.\
\- Case title.\
\- Incident description.\
\- Location and approximate incident time.\
\- Three to four suspects.\
\- Suspect motives and alibis.\
\- At least five evidence items.\
\- A timeline of relevant events.\
\- One predetermined culprit.\
\- A logical solution explanation.\
\- Evidence references supporting the solution.\
\
The culprit and solution must not be exposed in the initial response.\
\
\## FR-04: Suspect Management\
\
Each suspect must have:\
\
\- Unique suspect ID.\
\- Name.\
\- Short background.\
\- Relationship to the incident.\
\- Possible motive.\
\- Stated alibi.\
\- Relevant information or contradictions.\
\
All suspects should be plausible enough to encourage investigation.\
\
The case must have one designated culprit. The other suspects may have suspicious behavior, secrets, or misleading motives, but the solution must remain logically consistent.\
\
\## FR-05: Evidence Room\
\
The dashboard must display evidence as readable cards or organized tabs.\
\
\### Supported evidence categories\
\
\*\*A. Chat messages\*\*\
\- Fictional WhatsApp-style conversations.\
\- Sender and recipient names.\
\- Message timestamps.\
\- Message text.\
\- Optional conversation grouping.\
\
\*\*B. Images\*\*\
\- AI-generated images when a suitable image-generation service is available.\
\- Otherwise, textual image descriptions or clearly labeled illustrative images.\
\- Evidence title and description.\
\
\*\*C. CCTV evidence\*\*\
\- Simulated camera-recording descriptions or transcripts in the MVP.\
\- Camera location.\
\- Recording timestamp.\
\- Relevant observations.\
\- Optional video clip in a future version.\
\
\*\*D. Witness statements\*\*\
\- Witness name or role.\
\- Statement text.\
\- Relevant time and location.\
\
\*\*E. Documents and other clues\*\*\
\- Notes, receipts, logs, or other fictional records.\
\- A description of what the evidence reveals.\
\
Each evidence item must include:\
\
\- Evidence ID.\
\- Title.\
\- Category.\
\- Timestamp where relevant.\
\- Description or content.\
\- Optional media URL.\
\- Case association.\
\
The interface must clearly label generated or simulated media. It must never imply that fictional evidence is authentic real-world evidence.\
\
\## FR-06: Investigation Dashboard\
\
The dashboard must include:\
\
\- Case title and summary.\
\- Suspect list.\
\- Evidence room.\
\- Timeline.\
\- Selected suspect details.\
\- Suspect selection control.\
\- Submit Investigation button.\
\- Optional progress indicator.\
\
Users should be able to navigate between evidence categories without losing their current investigation.\
\
The dashboard should prioritize clarity over complex animations.\
\
\## FR-07: Culprit Selection\
\
Users must select one suspect from the generated suspect list.\
\
Requirements:\
\
\- Only valid suspect IDs belonging to the case may be submitted.\
\- Submission without a selection must be rejected.\
\- Repeated submissions must be prevented while processing.\
\- The frontend must display a clear confirmation or result.\
\- The backend must independently validate the selection.\
\
\## FR-08: Result and Solution Reveal\
\
After submission, the backend compares the selected suspect ID with the stored culprit ID.\
\
The result must include:\
\
\- Whether the answer was correct.\
\- The selected suspect.\
\- The actual culprit.\
\- The culprit's motive.\
\- The sequence of events.\
\- The evidence supporting the solution.\
\- An explanation of important contradictions.\
\- An option to start a new investigation.\
\
The backend must not ask Gemini to independently determine the culprit during answer checking. The answer must be compared against the original case solution.\
\
\## FR-09: Loading and Error Handling\
\
The application must provide appropriate states for:\
\
\- Generating a mystery.\
\- Loading the investigation.\
\- Submitting an answer.\
\- AI service unavailable.\
\- Invalid AI output.\
\- Network failure.\
\- Case not found.\
\- Invalid suspect selection.\
\- Rate-limit or quota errors.\
\
Error messages must be understandable to nontechnical users. Sensitive backend details and API keys must never be displayed.\
\
\## FR-10: New Investigation\
\
Users must be able to start a new case without refreshing the entire website.\
\
The application must reset the current investigation state and ensure that evidence and answers from the previous case cannot accidentally appear in the new case.\
\
\---\
\
\# 6. Non-Functional Requirements\
\
\## NFR-01: Usability\
The application must have clear navigation, readable evidence, and understandable instructions.\
\
\## NFR-02: Performance\
\- Avoid unnecessary API requests.\
\- Display loading feedback during generation.\
\- Use request timeouts and controlled retries.\
\- Optimize media sizes.\
\- Avoid blocking the interface during long operations.\
\
AI response time may vary depending on the model, network, and service availability.\
\
\## NFR-03: Security\
\- Store the Gemini API key only on the backend.\
\- Validate all incoming data.\
\- Never trust client-submitted culprit IDs or answer results.\
\- Keep the solution private until submission.\
\- Restrict access to private case data.\
\- Apply reasonable rate limits.\
\- Do not expose stack traces or secrets to users.\
\
\## NFR-04: Reliability\
\- Validate AI-generated JSON before using it.\
\- Reject malformed or incomplete cases.\
\- Ensure every case has exactly one designated culprit.\
\- Ensure all evidence references valid suspects or events.\
\- Handle external API failures gracefully.\
\
\## NFR-05: Accessibility\
\- Use semantic HTML.\
\- Provide keyboard-accessible controls.\
\- Include labels for form inputs.\
\- Maintain sufficient color contrast.\
\- Do not communicate correctness using color alone.\
\
\## NFR-06: Responsive Design\
Support modern desktop, tablet, and mobile browsers.\
\
\## NFR-07: Maintainability\
Keep frontend components, backend routes, business logic, AI prompts, and database models organized into separate modules.\
\
\---\
\
\# 7. Technology Stack\
\
\## Frontend\
\- React.js.\
\- JavaScript.\
\- HTML5.\
\- CSS3.\
\- Fetch API or Axios for HTTP requests.\
\
\## Backend\
\- Node.js.\
\- Express.js.\
\- JavaScript.\
\- REST API architecture.\
\
\## Database\
\- MongoDB.\
\- Mongoose for schema modeling.\
\
\## AI\
\- Google Gemini API.\
\- Structured JSON output where supported by the selected model.\
\- Server-side prompt construction and response validation.\
\
\## Development Tools\
\- Visual Studio Code.\
\- Git and GitHub.\
\- npm.\
\- Codex for specification-driven implementation.\
\- Postman or equivalent tooling for API testing.\
\
Use compatible, stable package versions and document the versions chosen.\
\
\---\
\
\# 8. System Architecture\
\
The application follows a client-server architecture.\
\
\*\*Request flow:\*\*\
\
1\. React collects the user's scenario.\
2\. Express receives and validates the request.\
3\. The backend calls Gemini with a controlled prompt.\
4\. Gemini returns the proposed mystery in structured form.\
5\. The backend validates suspects, evidence, timeline, and solution.\
6\. The backend saves the case in MongoDB.\
7\. The backend returns the public case data without the answer key.\
8\. React renders the investigation dashboard.\
9\. The user selects a suspect and submits the answer.\
10\. Express retrieves the case and checks the selected suspect against the stored culprit.\
11\. The backend returns the result and solution explanation.\
12\. React renders the results screen.\
\
\## Architectural security rule\
\
The correct culprit ID, private solution, and private reasoning must remain on the backend until the user submits an answer.\
\
They must not be included in public API responses, frontend source files, browser-visible state, or publicly accessible database documents.\
\
\---\
\
\# 9. Database Design\
\
Use MongoDB and Mongoose for persistent case storage.\
\
\## 9.1 Mystery Case\
\
Suggested fields:\
\
\- \`\_id\`: unique case identifier.\
\- \`title\`: case title.\
\- \`scenario\`: original user scenario.\
\- \`introduction\`: public incident description.\
\- \`suspects\`: array of suspect records.\
\- \`evidence\`: array of evidence records.\
\- \`timeline\`: array of event records.\
\- \`culpritId\`: private suspect identifier.\
\- \`solutionExplanation\`: private solution.\
\- \`solutionEvidenceIds\`: evidence IDs supporting the solution.\
\- \`createdAt\`: creation timestamp.\
\- \`status\`: case status.\
\
\## 9.2 Suspect\
\
Suggested fields:\
\
\- \`suspectId\`.\
\- \`name\`.\
\- \`background\`.\
\- \`motive\`.\
\- \`alibi\`.\
\- \`publicDetails\`.\
\
\## 9.3 Evidence\
\
Suggested fields:\
\
\- \`evidenceId\`.\
\- \`title\`.\
\- \`type\`.\
\- \`description\`.\
\- \`timestamp\`, when relevant.\
\- \`mediaUrl\`, when available.\
\- \`relatedSuspectIds\`.\
\- \`createdAt\`.\
\
\## 9.4 Investigation Submission\
\
If answer history is required, store:\
\
\- \`caseId\`.\
\- \`selectedSuspectId\`.\
\- \`isCorrect\`.\
\- \`submittedAt\`.\
\
Do not store unnecessary personal information.\
\
\## 9.5 Database Security\
\
Separate public case data from private solution data in serialization and API responses.\
\
The backend must explicitly construct public response objects rather than returning complete database documents.\
\
\---\
\
\# 10. AI Generation Requirements\
\
\## 10.1 Gemini Responsibilities\
\
Gemini must generate:\
\
\- Case introduction.\
\- Suspect profiles.\
\- Evidence.\
\- Timeline.\
\- Culprit assignment.\
\- Solution explanation.\
\- Evidence-to-solution relationships.\
\
\## 10.2 Prompt Requirements\
\
The backend prompt must instruct Gemini to:\
\
1\. Treat the user's scenario as inspiration for a fictional case.\
2\. Create exactly one designated culprit.\
3\. Create three to four suspects.\
4\. Produce at least five useful evidence items.\
5\. Establish a consistent event timeline.\
6\. Include clues that support the correct culprit.\
7\. Include plausible but fair red herrings.\
8\. Avoid contradictions that make the case impossible to solve.\
9\. Return data in the required schema.\
10\. Keep the solution separate from the public investigation data.\
\
\## 10.3 Validation Rules\
\
Before saving a generated case, verify that:\
\
\- All required fields are present.\
\- Suspect IDs are unique.\
\- Evidence IDs are unique.\
\- The culprit ID belongs to a generated suspect.\
\- Every solution evidence ID exists.\
\- Timeline entries are structurally valid.\
\- Evidence content is nonempty.\
\- The output matches the expected schema.\
\
If validation fails, allow a controlled retry or return a friendly error.\
\
\## 10.4 Fairness and Consistency\
\
The application must not rely on an unsupported claim that the culprit is correct merely because Gemini says so.\
\
The generated mystery should contain explicit evidence relationships and a coherent solution. The backend then preserves that solution and checks user answers deterministically.\
\
For improved quality, include automated checks and test cases for contradictions, missing clues, and ambiguous culprit selection.\
\
\---\
\
\# 11. API Specification\
\
All endpoints use JSON unless otherwise documented.\
\
\## 11.1 Generate a Mystery\
\
\*\*Endpoint:\*\* \`POST /api/mysteries/generate\`\
\
Request:\
\
&#x20;   {\
&#x20;     "scenario": "A valuable necklace disappears during a party."\
&#x20;   }\
\
Successful response:\
\
&#x20;   {\
&#x20;     "caseId": "case_123",\
&#x20;     "title": "The Missing Necklace",\
&#x20;     "introduction": "A necklace disappeared during a private party.",\
&#x20;     "suspects": [],\
&#x20;     "evidence": [],\
&#x20;     "timeline": []\
&#x20;   }\
\
The arrays shown are illustrative placeholders; actual responses must contain validated case data.\
\
The response must not include \`culpritId\` or private solution information.\
\
\## 11.2 Retrieve a Mystery\
\
\*\*Endpoint:\*\* \`GET /api/mysteries/:caseId\`\
\
Purpose: Retrieve the public details of an existing case.\
\
Return the case title, introduction, suspects, evidence, and timeline without the answer key.\
\
\## 11.3 Submit an Investigation\
\
\*\*Endpoint:\*\* \`POST /api/mysteries/:caseId/submit\`\
\
Request:\
\
&#x20;   {\
&#x20;     "suspectId": "suspect_2"\
&#x20;   }\
\
Successful response:\
\
&#x20;   {\
&#x20;     "isCorrect": false,\
&#x20;     "culprit": {\
&#x20;       "suspectId": "suspect_1",\
&#x20;       "name": "Example Suspect"\
&#x20;     },\
&#x20;     "explanation": "The timeline and messages contradict the selected suspect's alibi.",\
&#x20;     "supportingEvidence": []\
&#x20;   }\
\
The example is illustrative and does not define a real case.\
\
Only reveal the culprit and solution after an accepted submission.\
\
\## 11.4 Error Response Format\
\
Use a consistent format:\
\
&#x20;   {\
&#x20;     "error": {\
&#x20;       "code": "INVALID_SCENARIO",\
&#x20;       "message": "Please enter a valid scenario."\
&#x20;     }\
&#x20;   }\
\
Use appropriate HTTP status codes, including:\
\
\- \`200\`: successful retrieval or submission.\
\- \`201\`: successfully created case.\
\- \`400\`: invalid input.\
\- \`404\`: case not found.\
\- \`429\`: rate limit exceeded.\
\- \`500\`: unexpected server error.\
\- \`502\` or \`503\`: AI service or upstream dependency failure, as appropriate.\
\
Do not expose private AI prompts, API keys, or internal stack traces.\
\
\---\
\
\# 12. Frontend Pages and Components\
\
\## Page 1: Home\
\
Components:\
\- Navbar or simple header.\
\- Hero section.\
\- Scenario input form.\
\- Generate Mystery button.\
\- Instructions.\
\- Fictional-content disclaimer.\
\
\## Page 2: Investigation Dashboard\
\
Components:\
\- Case header.\
\- Case introduction.\
\- Suspect cards.\
\- Evidence category selector.\
\- Evidence cards.\
\- Timeline.\
\- Culprit selection section.\
\- Submit Investigation button.\
\
\## Page 3: Results\
\
Components:\
\- Correct or incorrect answer indicator.\
\- Selected suspect.\
\- Actual culprit.\
\- Explanation.\
\- Supporting evidence.\
\- Play Again button.\
\
\## Suggested reusable components\
\
\- \`Navbar\`\
\- \`ScenarioForm\`\
\- \`LoadingState\`\
\- \`SuspectCard\`\
\- \`SuspectList\`\
\- \`EvidenceCard\`\
\- \`EvidenceRoom\`\
\- \`Timeline\`\
\- \`CulpritSelector\`\
\- \`ResultPanel\`\
\- \`ErrorMessage\`\
\
Keep components small and reusable.\
\
\---\
\
\# 13. UI/UX Design System\
\
\## Visual Direction\
\
Use a modern detective investigation-room theme.\
\
Suggested colors:\
\- Background: dark navy or charcoal.\
\- Main surface: slightly lighter charcoal.\
\- Primary accent: cyan or blue.\
\- Secondary accent: amber.\
\- Main text: white or near-white.\
\- Secondary text: muted gray.\
\
Use consistent spacing, typography, borders, and card styles.\
\
\## Design Requirements\
\
\- Responsive navigation.\
\- Readable evidence cards.\
\- Clear suspect-selection states.\
\- Visible loading feedback.\
\- Clear success and error messages.\
\- Accessible form labels.\
\- Consistent buttons and focus states.\
\- Minimal unnecessary animations.\
\- No layout overflow on mobile screens.\
\
The design should feel immersive while keeping the investigation easy to understand.\
\
\---\
\
\# 14. Environment Variables\
\
Create a backend \`.env\` file with the following configuration:\
\
&#x20;   PORT=5000\
&#x20;   MONGODB_URI=your_mongodb_connection_string\
&#x20;   GEMINI_API_KEY=your_gemini_api_key\
&#x20;   CLIENT_URL=http\://localhost:5173\
\
These are configuration examples, not real credentials.\
\
Requirements:\
\- Add \`.env\` to \`.gitignore\`.\
\- Commit an \`.env.example\` file with placeholder values only.\
\- Never expose \`GEMINI_API_KEY\` through frontend environment variables.\
\- Validate required environment variables when the backend starts.\
\
\---\
\
\# 15. Suggested Project Structure\
\
&#x20;   ai-mystery-room/\
&#x20;   ├── client/\
&#x20;   │   ├── public/\
&#x20;   │   ├── src/\
&#x20;   │   │   ├── components/\
&#x20;   │   │   │   ├── Navbar.jsx\
&#x20;   │   │   │   ├── ScenarioForm.jsx\
&#x20;   │   │   │   ├── SuspectCard.jsx\
&#x20;   │   │   │   ├── EvidenceCard.jsx\
&#x20;   │   │   │   ├── Timeline.jsx\
&#x20;   │   │   │   └── ResultPanel.jsx\
&#x20;   │   │   ├── pages/\
&#x20;   │   │   │   ├── Home.jsx\
&#x20;   │   │   │   ├── Investigation.jsx\
&#x20;   │   │   │   └── Results.jsx\
&#x20;   │   │   ├── services/\
&#x20;   │   │   │   └── mysteryApi.js\
&#x20;   │   │   ├── App.jsx\
&#x20;   │   │   ├── main.jsx\
&#x20;   │   │   └── styles/\
&#x20;   │   └── package.json\
&#x20;   ├── server/\
&#x20;   │   ├── src/\
&#x20;   │   │   ├── config/\
&#x20;   │   │   ├── controllers/\
&#x20;   │   │   ├── models/\
&#x20;   │   │   ├── routes/\
&#x20;   │   │   ├── services/\
&#x20;   │   │   │   └── geminiService.js\
&#x20;   │   │   ├── validators/\
&#x20;   │   │   ├── middleware/\
&#x20;   │   │   ├── app.js\
&#x20;   │   │   └── server.js\
&#x20;   │   ├── tests/\
&#x20;   │   └── package.json\
&#x20;   ├── SPEC.md\
&#x20;   ├── .gitignore\
&#x20;   └── README.md\
\
This structure is a starting point. Codex may adjust it if necessary, provided the implementation remains organized and follows the specification.\
\
\---\
\
\# 16. Testing Requirements\
\
\## Unit Tests\
\
Test:\
\- Scenario validation.\
\- Generated case validation.\
\- Unique suspect and evidence IDs.\
\- Culprit ID validation.\
\- Public/private data separation.\
\- Answer evaluation.\
\
\## API Tests\
\
Test:\
\- Generating a valid case.\
\- Rejecting an empty scenario.\
\- Handling malformed AI output.\
\- Retrieving an existing case.\
\- Handling a nonexistent case.\
\- Rejecting an invalid suspect ID.\
\- Correct and incorrect answer submissions.\
\- Handling AI service failures.\
\
\## User Interface Tests\
\
Test:\
\- Scenario form validation.\
\- Loading indicator.\
\- Suspect selection.\
\- Evidence navigation.\
\- Result display.\
\- Error states.\
\- Responsive layouts.\
\
\## End-to-End Test\
\
The following flow must work:\
\
1\. Open the website.\
2\. Enter a scenario.\
3\. Generate a mystery.\
4\. View suspects and evidence.\
5\. Select a suspect.\
6\. Submit the answer.\
7\. View the solution.\
8\. Start another investigation.\
\
The application must not reveal the answer before submission.\
\
\---\
\
\# 17. Acceptance Criteria\
\
The MVP is accepted only when the following conditions are met:\
\
\- [ ] A user can enter a valid scenario.\
\- [ ] Empty scenarios are rejected.\
\- [ ] Gemini generates a mystery through the backend.\
\- [ ] Each case has three to four suspects.\
\- [ ] Each case has at least five evidence items.\
\- [ ] The evidence and timeline support one coherent solution.\
\- [ ] The frontend displays suspects and evidence clearly.\
\- [ ] Users can select and submit a suspect.\
\- [ ] The backend evaluates answers using the stored culprit ID.\
\- [ ] The correct answer remains private before submission.\
\- [ ] The result contains a useful explanation.\
\- [ ] Errors are handled gracefully.\
\- [ ] The Gemini API key is not exposed in the browser.\
\- [ ] The application works on desktop and mobile.\
\- [ ] Setup instructions allow another developer to run the project.\
\- [ ] Core automated tests pass.\
\
\---\
\
\# 18. Development Plan\
\
\## Phase 1: Project Setup\
\
\- Create the client and server directories.\
\- Configure React and Express.\
\- Set up environment variables.\
\- Create a health-check endpoint.\
\- Add a README with setup instructions.\
\
\*\*Deliverable:\*\* Frontend and backend run locally.\
\
\## Phase 2: Frontend Prototype\
\
\- Build the landing page.\
\- Add the scenario form.\
\- Create sample suspect and evidence cards.\
\- Build the investigation dashboard.\
\- Implement suspect selection and a sample results screen.\
\
\*\*Deliverable:\*\* Complete user flow using sample data.\
\
\## Phase 3: Gemini Integration\
\
\- Configure the Gemini SDK.\
\- Implement the AI prompt.\
\- Generate structured mystery data.\
\- Validate generated output.\
\- Add loading and error states.\
\
\*\*Deliverable:\*\* AI-generated cases appear in the interface.\
\
\## Phase 4: Backend Investigation Logic\
\
\- Store cases in MongoDB.\
\- Separate public case data from private solutions.\
\- Implement case retrieval.\
\- Implement answer submission.\
\- Return the solution only after submission.\
\
\*\*Deliverable:\*\* Complete backend-powered investigation.\
\
\## Phase 5: Testing and Refinement\
\
\- Test all API endpoints.\
\- Validate evidence consistency.\
\- Test error handling.\
\- Fix responsive design issues.\
\- Improve accessibility.\
\- Verify environment configuration.\
\
\*\*Deliverable:\*\* Tested MVP.\
\
\## Phase 6: Deployment\
\
\- Choose appropriate hosting for the frontend and backend.\
\- Configure production environment variables.\
\- Configure the production database.\
\- Restrict CORS to the intended frontend.\
\- Test the deployed application.\
\
\*\*Deliverable:\*\* A publicly accessible application, if hosting is configured.\
\
\---\
\
\# 19. Definition of Done\
\
A feature is complete only when:\
\
1\. It meets the requirements in this document.\
2\. It works with the actual application flow.\
3\. It handles invalid input and relevant failures.\
4\. Its private data remains protected.\
5\. It has appropriate tests.\
6\. It does not break existing functionality.\
7\. Its setup or usage instructions are updated where necessary.\
\
A visually complete page without working functionality does not count as a completed feature.\
\
\---\
\
\# 20. Instructions for Codex\
\
This document is the single source of truth for the AI Mystery Room project.\
\
Before implementation:\
1\. Read \`SPEC.md\` completely.\
2\. Inspect the existing repository, if one exists.\
3\. Identify missing requirements, dependencies, and configuration.\
4\. Propose an implementation plan.\
5\. Identify any conflicts before changing the specification.\
\
During implementation:\
1\. Follow the documented MVP priorities.\
2\. Implement small, testable stages.\
3\. Use the specified MERN stack and Gemini AI.\
4\. Keep the API key and solution data on the backend.\
5\. Validate all AI-generated content.\
6\. Use the database schema and API contracts described here.\
7\. Avoid adding unnecessary dependencies.\
8\. Do not silently remove or reinterpret requirements.\
9\. Update tests and documentation alongside implementation.\
10\. Do not claim a feature works unless it has been tested.\
\
After each stage:\
\- Summarize what was implemented.\
\- List files created or modified.\
\- Report tests run and their results.\
\- Identify remaining work.\
\- Explain any blocker before proceeding.\
\
If a requirement cannot be implemented exactly as written, explain the limitation and propose the smallest suitable change. Update this specification only after the change has been explicitly approved.\
\
\---\
\
\# Final Product Goal\
\
Deliver a complete, responsive AI Mystery Room website where users can turn a story idea into a fictional investigation, inspect AI-generated evidence, identify a culprit, and understand the reasoning behind the solution.\
\
The project must prioritize a coherent, secure, and fully working investigation flow over optional advanced features.\


## How to use this with Codex

1. Create a folder named `ai-mystery-room`.
2. Create a file called `SPEC.md` and paste the complete specification above.
3. Open the folder in your coding environment and start Codex.
4. Ask Codex to read `SPEC.md` and implement Phase 1 only.
5. Test each phase before moving to the next.

My recommendation: Build the complete user interface with sample mystery data first, then integrate Gemini and MongoDB. This approach makes the project easier to understand, debug, and finish on time.

If you want, I can:

- Define API endpoints for mystery case management
- Outline frontend component interactions
- Detail validation criteria for AI-generated mystery data