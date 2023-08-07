---
title: Equipment Tracker
date: 2021-04-6 11:33:00 +0800
categories: [Spring ]
tags: [Java]
pin: true
math: true
mermaid: true
image:
  path: /assets/img/EQ_Tracker/EQ_Scheme.jpg
---

<h2 class="mt-5">Project Description</h2>
This was a class project to create a Java EE application that would be used to keep track of client information, employee details, equipment usgae, equipment location, and equipment issues. The application followed the MVC design pattern, persisted the data in a MySQL database, and was deployed on Apache Tomcat.

<h2 class="mt-5">App Photos</h2>
<h3 class="mt-5">Database Scheme</h3>
![Desktop View](/assets/img/EQ_Tracker/EQ_Scheme.jpg)

The database scheme is shown below and was modeled in MySQL.

<h3 class="mt-5">Login</h3>
![Desktop View](/assets/img/EQ_Tracker/EQ_login.jpg)
The user would enter the login name to enter.


<h3 class="mt-5">Main</h3>
![Desktop View](/assets/img/EQ_Tracker/EQ_options.jpg)
Once logged in, the user would be take to a page with an option to either run a report or register to a class.

<h3 class="mt-5">Check In/Out Equipment</h3>
![Desktop View](/assets/img/EQ_Tracker/EQ_checkin.jpg) ![Desktop View](/assets/img/EQ_Tracker/EQ_checkout.jpg)

The user could checkout equipment provided that the date range did not have any usgae for it. When they are ready to check in, they would enter their reservation ID and update the reservation status.

<h3 class="mt-5">Check In/Out Equipment</h3>
The user could run a variety of reports to view a list of clients, reservations for that week, reservation per user, and equipment location.
![Desktop View](/assets/img/EQ_Tracker/EQ_reports.jpg)
![Desktop View](/assets/img/EQ_Tracker/EQ_currentres.jpg)
![Desktop View](/assets/img/EQ_Tracker/EQ_equipmentlocation.jpg)
![Desktop View](/assets/img/EQ_Tracker/EQ_clientlist.jpg)