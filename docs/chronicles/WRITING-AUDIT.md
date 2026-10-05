# Audit Checklist: AI Signal Detection

Run every item in this checklist against the input text before rewriting.
Flag each issue found. Group findings by category in the Audit Report.

---

## CATEGORY 1: Lexical Flags (Word-Level AI Tells)

### 1.1 Banned Transition Words
Flag any use of:
- Furthermore, Moreover, Additionally, In addition
- In conclusion, To summarize, In summary, Ultimately
- It's worth noting, It's important to note, Notably
- Importantly, Significantly, Interestingly
- That being said, Having said that, With that in mind
- At the end of the day, All things considered
- Moving forward, Going forward
- First and foremost, Last but not least

### 1.2 Corporate Filler Words
Flag any use of:
- leverage, synergy, holistic, robust, seamless
- innovative, dynamic, impactful, transformative
- streamline, optimize, utilize (use "use"), facilitate
- ecosystem, landscape, journey (as metaphor), space (as industry term)
- cutting-edge, state-of-the-art, best-in-class
- deliverables, takeaways, learnings (as noun)
- pain points, low-hanging fruit, move the needle
- at scale, in real-time, going forward

### 1.3 Vague Quantifiers
Flag instances of: many, several, various, numerous, a number of, countless, some
(Only flag when a specific number or example could replace them.)

### 1.4 Hedging Language
Flag any use of:
- It could be argued, One might say, There is a possibility
- It seems, It appears, Arguably
- In some ways, To some extent, In a sense

### 1.5 Em Dashes
Flag every em dash (—). Replace with comma, colon, period, or parentheses.

### 1.6 Sycophantic or Performative Openers
Flag: "Great question," "Absolutely," "Certainly," "Of course," "I'd be happy to"
Also flag: "I am passionate about," "I am honored to," "I am excited to share"

---

## CATEGORY 2: Structural Flags (Sentence and Paragraph Level)

### 2.1 Uniform Sentence Length
Flag: any sequence of 4+ sentences where all sentences are within 5 words of each other in length.
Human writing naturally oscillates between short punches and longer, more developed thoughts.

### 2.2 Parallel Construction Overuse
Flag: 3 or more consecutive sentences that begin with the same word or follow the same
grammatical template (Subject + Verb + Object, repeated).
Example of flagged pattern:
"The team identified the problem. The team designed a solution. The team tested the result."

### 2.3 Back-to-Back "I" Openers
Flag: any two consecutive sentences that both begin with "I."

### 2.4 Predictable Paragraph Length
Flag: 3+ consecutive paragraphs of the same approximate length (within 1 sentence of each other).
AI writing produces uniform paragraph weight. Human writing doesn't.

### 2.5 Setup-Then-Summarize Structure
Flag: any paragraph that ends by restating what it just said.
Also flag: any piece that opens with a paragraph previewing what's about to be said,
then ends with a paragraph summarizing what was just said.

### 2.6 List-of-Three Reflex
Flag: recurring use of the "X, Y, and Z" three-item pattern across multiple sentences.
One use is fine. Two or more in a short piece is an AI pattern.

### 2.7 "Here's a/an [thing]:" Opener
Flag any sentence that opens with: "Here is," "Here are," "Here's a," "Here's an,"
"Below is," "Below are" — these are AI meta-commentary patterns, not writing.

---

## CATEGORY 3: Rhythm Flags (Whole-Text Level)

### 3.1 Front-Loaded Generic Opening
Flag: any piece that opens with a broad, context-setting statement before getting to the point.
Examples of flagged openers:
- "In today's fast-paced world..."
- "Design has always been about..."
- "When it comes to user experience..."
The most interesting or specific detail should come first.

### 3.2 Predictable Conclusion
Flag: any closing paragraph that:
- Starts with "In conclusion" or "Ultimately"
- Summarizes the points just made
- Ends with a generic forward-looking statement ("As we move into the future...")

### 3.3 Symmetrical Structure
Flag: pieces where every section is the same length and follows the same internal structure.
Real writing has heavier sections and lighter sections based on what the content demands.

### 3.4 Thesis-Body-Conclusion Arc (When Inappropriate)
Flag: casual content (LinkedIn posts, captions, short articles) that follow a rigid
academic essay structure. A LinkedIn post is not a five-paragraph essay.

### 3.5 No Specific Details
Flag: any substantive claim that lacks a specific number, name, date, example, or
observable outcome. Generalities without specifics are a strong AI signal.

---

## CATEGORY 4: Brand Flags (ChrowmDesigns Content Only — Mode A)

Run these only when the content is for ChrowmDesigns channels.

### 4.1 Missing ChrowmDesigns Name Reference
Flag if ChrowmDesigns is not referenced by name at least once in pieces over 150 words.

### 4.2 Task Descriptions Posed as Results
Flag any result statement that describes a task instead of an outcome.
"Redesigned the booking flow" = task. "Reduced abandonment 34%" = result.

### 4.3 Generic Diplomacy
Flag: "I am happy to help," "It was a pleasure working with," "I look forward to"
These are filler. Replace with a specific observation or direct statement.

### 4.4 Theory-First Framing
Flag: any statement that leads with a framework, methodology, or principle before
grounding it in a real example from Angelo's practice.
Correct order: real example first, principle second (if needed at all).

---

## Scoring the Audit

After running all checks, count:
- 0-2 flags total: Minor cleanup needed
- 3-5 flags: Moderate rewrite needed
- 6-10 flags: Full rewrite needed
- 10+ flags: Rebuild from scratch using only the core ideas

Report the score and category breakdown in the Audit Report before rewriting.
