# Overview
## Quantageddon: Predicting Stock Market Returns

### Goal
Develop a machine learning model to predict next-day stock returns using historical price and volume data. This competition challenges participants to create robust prediction models that can capture market patterns while avoiding overfitting.


# Description

## General
Stock market prediction remains one of the most challenging problems in financial technology. While perfect prediction is impossible, machine learning models can identify patterns and relationships that help understand market behavior.We have price pool of Prize Pool **₹15.25k** and much more....

## Challenge Details
In this competition, you'll work with synthetic market data that mimics real-world stock behavior. Your task is to predict the next-day returns for multiple stocks using historical pricing and volume information.

### Data Description
The dataset includes daily stock information with the following features:
- `date`: Trading date
- `stock_id`: Unique identifier for each stock
- `daily_high`:Daily High
- `volume`: Daily trading volume
- `close`: Daily closing price
- `open`:Daily opening (target variable)

## Files
- `train.csv`: Training data containing historical stock information
- `test.csv`: Test data for which you'll predict returns
- `sample_submission.csv`: Example of correctly formatted submission

## Timeline
- Start Date: 1 January 2025
- Final Submission Deadline: 6 January 2025
- Winners Announced: 7 January 2025

## Rules
1. **No External Data**: Only provided datasets may be used
2. **No Code Sharing**: Each participant must develop their own solution
3. **AI Usage**: AI tools can be used for coding assistance, but direct code copying is prohibited
4. **Submission Limits**: Maximum 5 submissions per day
5.**API Prohibited** :API usage is prohibited

## Prize Pool 
- 1st Place: ₹5,250
- 2nd Place: ₹3,000
- 3rd Place: ₹2,000
- 4th Place: ₹1,000
- 5th Place: ₹1,000
- 6-11 : ₹500 amazon vouchers


## Technical Approach
Participants can use various methods:

a) Traditional Machine Learning:
- Random Forest
- XGBoost
- LightGBM
- Support Vector Regression

b) Deep Learning:
- LSTM Networks
- Transformer models
- 1D CNN models

##Tips for Participants
- Start with simple models and gradually increase complexity
- Focus on feature engineering
- Use cross-validation to avoid overfitting
- Consider ensemble methods
- Pay attention to data leakage

# Evaluation

## Metric
Submissions are evaluated using Root Mean Squared Error (RMSE) between predicted and actual returns:

$$ MSE = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2 $$

Where:

 - is the actual return ->$$\(y_i\) $$ 

 - is the predicted return ->$$\(\hat{y}_i\) $$ 

 - is the number of predictions ->$$\(n\) $$ 

## Submission Format
The submission file must be a CSV with exactly two columns:
```
id,returns
STOCK_0_2024-01-01,0.0023
STOCK_0_2024-01-02,-0.0015
STOCK_1_2024-01-01,0.0034
```

### Requirements:
- Header row must be `id,returns`
- `id` should be `STOCK_ID_DATE` format
- `returns` should be floating-point numbers
- File must contain predictions for all test set dates

## Leaderboard
- Public Leaderboard: Based on 15% of test data
- Private Leaderboard: Based on 85% of test data (determines final rankings)

## Code Requirements
Final submissions must include:
- Complete source code
- Documentation of approach
- Feature engineering explanation

Good luck to all participants! 🚀

# Competition Rules - Quantageddon 2025

## 1. Competition Details
- **Competition Title:** Quantageddon - Stock Market Prediction Challenge
- **Competition Sponsor:** IITM Paradox 2025
- **Website: [Quantageddon](https://quant.iitmparadox.org/)**

## Competition Rules

### Eligibility
- Open to all IITM BS Degree students
- Participation can be individual or in teams
- Team members must be current IITM BS students

### Team Limits
- Maximum team size: 5 members
- Team mergers are not allowed
- Each participant can be part of only one team

### Submission Guidelines
- Maximum 5 submissions per day
- Final submission limit: 2 submissions per team
- All code must be original and created by the team
- Use of AI tools (like ChatGPT) for coding assistance is allowed, but direct code copying is prohibited

### Data Usage Rules
- Only provided competition data may be used
- No external data sources allowed
- Data sharing between teams is prohibited
- Competition data can only be used for this competition

### Code Requirements
Final submissions must include:
- Complete source code
- Documentation of approach
- Feature engineering explanation
- Model architecture details

### Evaluation
- Private Leaderboard: 100% of test data
- Final rankings will be determined by the Private Leaderboard scores

## 4. Winner Obligations
Winners must provide:
- Detailed documentation of their solution
- Source code with clear instructions
- Brief presentation of their approach
- Valid student ID for prize distribution

## 5. Disqualification Criteria
Participants will be disqualified for:
- Using external data
- Sharing code between teams
- Multiple accounts per participant
- Attempting to manipulate the leaderboard
- Violating any competition rules

## 6. Important Dates
- Start Date: 1 January 2025
- Final Submission Deadline: 6 January 2025
- Winners Announcement: 7 January 2025

All decisions made by the Paradox organizing team regarding the competition will be final and binding.

For any queries, contact: [23f2002121@ds.study.iitm.ac.in](https://mail.google.com/mail/?view=cm&fs=1&to=23f2002121@ds.study.iitm.ac.in)