Create a simple Reactct app with VITE. It will have the following:

## Profile page
A page that includes the user profile with the following information in the header:
    - First Name
    - Last Name
    - Middle Initial
    - Employee ID
    - Department
In that header it will have a checkbox selecting the position type, which will influence the rest of the profile. The checkbox menu will be called position type, and the options are full-time, part-time, and work study. Based on the user's selection it will render the following details of the profile:

### Full-time
Pending
### Part-time
Pending
### Work study
Pending
### For all profiles
If filled or not on edit mode, the fields are disabled but display the selected values. It has 2 more things:

#### Schedule
It allows for the employee to place their schedule from Monday through Sunday with the ability to add and remove multiple start and end times through each day.

#### Timesheet archive
table including each time sheet created, with the ability to edit, delete, and print to pdf.

## Monthly timesheet editor
A page that allows the user to select a month and year, and create a calendar which gets autopopulated with the number of hours worked each day based on the user's schedule. They can edit the number of hours on days. If they are work study, any hours over 15 a week are considered overtime, for part time 19 hours, and full time 40 hours. The calendar will be a row per week with 9 columns, 1 per day of the week, 1 for total regular hours worked that week, and 1 for overtime hours. There will be a final row showing how many hours of the month are regular and how many overtime. For full time, there will be a couple of additional boxes for each day. Give a generic label for now

All data is to be saved in an encryupted json with the following format:

```json
{
    "profile":{
        //all profile information
    },
    "timesheets":[
        //all timesheet information
    ]

}
```
