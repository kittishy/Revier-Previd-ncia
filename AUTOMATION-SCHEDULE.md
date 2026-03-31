# 🔔 SCHEDULED TASKS & AUTOMATION
**Created:** 31 March 2026  
**System:** Revier Insurance Market Intelligence

---

## AUTOMATED WEEKLY SWEEP

### Task: Market Intelligence Collection & Analysis

**Schedule:** Every Monday at 07:00 UTC-3 (São Paulo time)

**Execution:** `.agents/scripts/market_intel_weekly.ps1`

**Processing:**
1. **Data Collection (07:00-07:15)**
   - Firecrawl scrapes all 48 trusted sources
   - Extracts market updates, regulatory changes, news
   - Consolidates into standardized format

2. **Analysis (07:15-07:30)**
   - Insurance specialist analyzes findings
   - Detects trends and anomalies
   - Identifies opportunities for Revier
   - Flags compliance/regulatory changes

3. **Report Generation (07:30-07:45)**
   - Output: `reports/market-intelligence/YYYY-MM-DD-weekly-sweep.md`
   - Content: Actionable intelligence + source links
   - Distribution: Git commit + notification

4. **Deployment (07:45-08:00)**
   - Auto-commit to git
   - Push to origin/main
   - Available for Revier team

**Output Location:**
```
reports/market-intelligence/
├── 2026-04-07-weekly-sweep.md  (Next run: 7 April)
├── 2026-04-14-weekly-sweep.md
├── 2026-04-21-weekly-sweep.md
└── [Continuous weekly generation]
```

**Monitoring Alerts:**
- 🔴 **CRITICAL:** New ANS/SUSEP regulation → Immediate alert
- 🟡 **WARNING:** Major operadora issue → Flag for review
- 🟢 **INFO:** Standard market updates → Weekly report

---

## MANUALLY TRIGGERED TASKS

### Deep Market Analysis (On-Demand)

**Trigger:** When user asks insurance specialist for detailed analysis

**Process:**
1. User mentions "ANS", "SUSEP", or insurance context
2. Specialist auto-invokes + loads firecrawl skill
3. Performs targeted deep-crawl of relevant sources
4. Generates analysis report within conversation

**Example:**
```
User: "What's the current ANS pricing landscape?"
→ Specialist auto-activates
→ Firecrawl performs deep-crawl of ANS operators database
→ Generates detailed pricing comparison
→ Provides recommendations for Revier positioning
```

---

## QUARTERLY REVIEWS

### Market Intelligence Strategy Review

**Frequency:** Every 3 months (Q2, Q3, Q4 2026)

**Activities:**
1. Review accuracy of previous predictions
2. Validate source list (retire/add sources)
3. Adjust automation schedule if needed
4. Plan coverage expansion

**Next Review:** 30 June 2026

---

## CREDIT MANAGEMENT

### Firecrawl Budget Tracking

**Allocation:** 1,400 credits / year (pay-as-you-go)

**Usage Pattern:**
- Weekly sweep: ~4-6 credits
- Monthly deep crawls: ~10-15 credits
- Ad-hoc research: ~5-10 credits
- **Monthly average:** ~30 credits (~$15)
- **Annual commitment:** ~360 credits (~$180)

**Budget Status:**
- Current active: 1,382 credits
- Used this session: 18 credits
- Remaining: 1,382 credits
- Months of operation: ~46 months (3+ years)

**Alerts:**
- 🟡 WARNING: <500 credits remaining
- 🔴 CRITICAL: <100 credits remaining
→ Alert sent to team for credit refresh

---

## TESTING & VALIDATION SCHEDULE

### Monthly Validation Checks

**1st Monday of each month - Extended Test:**
1. Firecrawl connection test
2. All 48 sources availability check
3. Data extraction quality validation
4. Report formatting verification
5. Git deployment test

**Result:** Saved to `reports/validation/` directory

---

## ESCALATION PROCEDURES

### Issue Escalation Matrix

| Issue | Severity | Action | Owner |
|-------|----------|--------|-------|
| Firecrawl auth fails | 🔴 CRITICAL | Restart OAuth + rollback | Engineering |
| Source unavailable (1-2) | 🟡 WARNING | Add backup source | Intel Team |
| Report generation failure | 🔴 CRITICAL | Manual report + investigate | Engineering |
| Credit exhaustion | 🟡 WARNING | Refresh credits + notify | Finance |
| Market anomaly detected | 🔴 CRITICAL | Expert review + alert team | Insurance Specialist |

---

## INTEGRATION WITH REVIER SYSTEMS

### Daily Operations

**Sales Team:**
- Access intelligence via insurance specialist (auto-invoked)
- Use market data in sales presentations
- Reference latest regulations/pricing

**Product Team:**
- Monitor `reports/market-intelligence/` for trends
- Plan features based on market insights
- Track competitive landscape

**Leadership:**
- Weekly executive summary (Mondays ~08:30)
- Quarterly strategic reviews
- Annual market forecasting

---

## DISASTER RECOVERY

### Backup Procedures

**If Firecrawl service unavailable:**
1. Fall back to HTTP-based data collection
2. Manual source scraping via web browsers
3. Delay report by 24-48 hours
4. Resume normal schedule when service restores

**If Git deployment fails:**
1. Store report locally in `reports/` directory
2. Manual git push when connectivity restored
3. No intelligence lost (files preserved)

**If authentication expires:**
1. Automatic re-authentication via OAuth
2. Manual refresh available: `firecrawl login`
3. System auto-detects and retries

---

## DOCUMENTATION & TRAINING

### For Team Members

**To understand the system:**
1. Read: `.agents/agents/insurance-broker-specialist.md`
2. Read: `.agents/skills/insurance-market-intelligence/SKILL.md`
3. Check: `reports/market-intelligence/` for examples

**To access intelligence:**
- Just mention "ANS", "SUSEP", or "plano de saúde" in any request
- Specialist auto-activates with market context
- No special commands needed

**To troubleshoot:**
- Check Firecrawl status: `firecrawl --status`
- Verify agent loaded: Search `.agents/agents/` for specialist
- Review last report: `reports/market-intelligence/` latest file

---

## CONTINUOUS IMPROVEMENT

### Feedback Loop

**Monthly Review Questions:**
1. Is the intelligence actionable?
2. Are predictions matching reality?
3. Should we add/remove sources?
4. Can we improve frequency?
5. Are there new market areas to track?

**Feedback Channel:** Open issues in repo tagged `#intelligence`

---

**Last Updated:** 31 March 2026  
**Next Automation Run:** 7 April 2026 at 07:00 UTC-3

