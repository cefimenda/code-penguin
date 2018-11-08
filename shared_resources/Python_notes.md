###Setting up the Evniorment
To create the virtual enviornment
-`virtualenv <virtualenvfile>`
- Inside <virtualenvfile> ((myapp)) folder:
    -Inclide
    -Lib
    -Scripts 
    -tcl


To run the virtual enviornment
-got in to the <virtualenvfile> file 
-`source Scripts/activate`
-To stop the virtualenv `deactivate`


Install Django into the virtualenv
-`pip install Django`


To create a Django project folder
-`django-admin startproject <project_name>`
- Inside the Django project <project_name> ((app)) folder:
    -app
        -__init__.py
        -__settings.py__: info on the database you are using
        -__urls.py__: controls route to views
        -__wsgi.py__: NEVER TOUCH!!!
    -__manage.py__: file that help manage your project


To create the frontend app
-go into the <project_name> folder
-`python manage.py startapp <projectname>`
- Inside <app_name> ((users)) folder:
    -__init__.py
    -__admin.py__
    -__apps.py__
    -__models.py__
    -__test.py__
    -__views.py__
    -migrations: used for database migrations (when new models are made it will automatically update the database to have the new model)
        -__init__.py

To let <project_name> folder know that we have added <app_name>
-inside <project_name> for to __settings.py__
-line 33: INSTALLED_APPS array
    -add `users.apps.UsersConfig`



###Start creating the app
-Go to <app_name> __views.py__ (will be practically empty): Thsi will responsible for what the user sees
    - you can add a templates folder so you dont need to write the whole HTML in this file
-Go to <project_name> __urls.py__: links to the project urls.py
-In <app_name> create __urls.py__: add the route to the pages (like app.get("/pagename"))



###To create templates
-In <app_name> create a folders callled `templates\users`
-In the templates\users folder add a `layout.html` (basically the main.handlebars)
-adding the place holder:
    `{% block <name> %}{% endblock %}`
-same lvl as the layout add the other pages




###To run the server (node server)
- In <project_name>
- `python manage.py runserver`



###To migrate
-initial migration are all default Django addons (ie users login)
-`python manage.py makemigrations && python manage.py migrate`



# MODELS!!!
-when we edit models it will update the database
-Found at <app_name> folder __models.py__

# How to create tables in sqllight after creating the models
- First you need to make the document that will create the tables from the models:
- `python manage.py makemigrations`
    - This will crate a new file (0001_initial.py) in the <app_name/migrations> folder
- Then you need to tell the app this exsits
- `python manage.py migrate`





###To Run the app's shell
- In <project_name>
-`python manage.py shell`
- To exit shell: `Ctrl + z` then `enter key`
- To use the models: `from users.models import <model_name> ((User))`
- To create a variable with the model: `suzie = <model_name>(first_name='Suzie', last_name='Student', email='suzie@email.com', age=43)`
- To save variable to sqllite:
    -make sure the model is created
    -the tables are created (`python manage.py makemigrations && python manage.py migrate`)
    - THEN in the SHELL `suzie.save()`
- To see all that entries in the database `<model_name>.objects.all()`
- to use all the data in the database make it equal to a variable
    -`users = <model_name>.objects.all()`
    -Then you can:
    `for user in users:`
    `   print(user)` (remember to press tab)
    ``


###Random Facts
-Python does MTV (Models - Template - Views)
    -where Views controls the models and Template is what the users view
-Django comes with its own template engin
-Django comes with sqllite