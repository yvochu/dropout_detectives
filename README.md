# dropout_detectives
This project aims to develop an interactive data visualizations that explores student dropout trends by analyzing key factors such as number of failures, total grades, parental status, parent occupations, and other relevant variables.

We wanted to use our data to answer the following questions:
    
    What relationship, if any, exists between the number of previous failures and a student’s final grade? Are students with more previous class failures likely to have lower final grades?
    How does a parent's occupation impact their child’s continued education?
    How does parental status (e.g., married, separated) affect dropout rates?

How to Interact
    
    1 The user must first run the app.py in the Internet_Access_Dropout_Rates folder in order to load the data from the pymongo database called dropout_project.  The collection of dropouts will load 649 sets of data.
    
    2 The logic.js will be ran in order to load chart formats and customizations
    
    3 The user can then open the live server to reveal a dashboard that shows 4 seperate visuals.
      - Boxplot includes tracer attributes to display Failures and Grades.
      - The Mother and Father charts include tracer attributes to display Occupation and Dropout counts.  It also includes a failed attempt to create a filter that allows to see if the student was provided with family support. 
      - Pie chart allows the ability to toggle between parental status and total dropouts.
      - The Parental Status and Dropout bar graph includes tracer attributes to display Total Parents Together, Parents together Dropouts, Total Parents Apart, Parents Apart Dropouts.

Ethical Considerations

  The data was collected from the references link below off of Kaggle.  We did not clean or manipulate the data in any manner that would have caused the data to be bias or invalid.  The data provides a lot of anonymity in order to protect the privacy of the researched student and their dropout data.  No private details were shared that could be tracked back to an individual.  The classification of jobs allows a more discrete view that makes it impossible to track back to a student's family.  The broad results of the data provide for a safe and ethical interpretation of student dropout rates and their factors. 

Analysis

  Boxplot: The purpose of this analysis is to determine if students with more previous class failures are more likely to have lower final grades.
  
    Key Takeaways:
        Students with no previous failures have a higher median final grade compared to those with 1, 2, or 3 failures. This suggests that more failures are associated with lower academic performance.
        As the number of failures increases, the median grade decreases, indicating that previous academic failures could negatively impact future academic performance.
        The distribution for students with failures (especially 1 or 2) shows lower outliers, suggesting that some students with prior failures perform significantly worse in their final grades.
  
  Mother and Father Chart: The purpose of this comparison was to uncover the relationship between each parent’s job and whether their child dropped out.
     
     Key Takeaways:
        The other occupation categorization resulted in the most dropouts for Mothers and Fathers.
          Mothers other dropouts = 42
          Fathers other dropouts = 54
        There was a significant difference in the at home occupation and resulting dropouts for Mothers and Fathers
          Mothers at home dropouts = 29
          Fathers at home dropouts = 7
        Teachers were the most successful at preventing their children from dropping out for Mothers and Fathers.
          They each only resulted in 3 dropouts.
  
  Parental Status Pie and Bar charts: The analysis of comprehensive factors on student dropout rates in secondary education. Parental status refers to the living arrangements of the parents; A for living together and T for living apart.
    
    Findings:
      The total amount of dropouts found in dataset were 100 students. 
      Out of the entire dataset, 80 parents lived together and 569 parents lived apart. 
      There were 100 dropouts in total.
        There were 12 dropouts from parents living together
        There were 88 dropouts from parents living apart
      This shows that students were more likely to complete school if they had both parents at home.

References
Kaggle
https://www.kaggle.com/datasets/abdullah0a/student-dropout-analysis-and-prediction-dataset
