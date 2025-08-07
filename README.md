# Groceries Manager

Welcome to **groceries manager** project ! This website allows users to create grocery lists and manage their items.

This project was built using **Vite** and **React 19**.

**Home page**

![Home Page](src/assets/images/readme/home/home.png)

**_Home page Features Section_** - In the features section, users can explore the main functionalities of the Groceries Manager.

![Home Page Features Section](src/assets/images/readme/home/home_features_section.png)

<br>

**Responsive Pages** - This project was built with responsive pages in mind.

**_Home Page on Small Screen_**

![Home page Small Screen](src/assets/images/readme/small_screen/home.png)

**_Menu on Small Screen_**

![Home page Small Screen](src/assets/images/readme/small_screen/menu.png)

**_Groceries List on Small Screen_**

![Groceries List page Small Screen](src/assets/images/readme/small_screen/groceriesList.png)

<br>

**Error Pages**

**_Error Page_** - this page is displayed when a user attempts an action on the website, but an error occurs.

![Error page](src/assets/images/readme/error/page_error.png)

**_Not Found Page_** - this page is displayed when a user attempts to navigate to a URL that doesn't exist or is unavailable within the website.

![Not Found page](src/assets/images/readme/error/page_not_found.png)

<br>

**User Sign Up** - to access the features of Groceries Manager, user must first sign up.

![User Sign Up page](src/assets/images/readme/authentication/user_sign_up.png)

## Features

**Grocery lists** - after successful authentication, the user will be redirected to the "My Lists" page, where they can view existing lists and add new ones.

![Grocery Lists page](src/assets/images/readme/list/groceryLists_empty.png)

**Add Groceries list** - to create a new groceries list, user must fill out the "Name" field.

![Add Groceries List page](src/assets/images/readme/list/groceryLists_add_list.png)

**Groceries list Actions** - after successfully adding a new grocery list, the user will be redirected to the "My Lists" page. A success notification will appear, and the user can view or delete the list through the "Actions" column in the table.

![Empty Groceries list page](src/assets/images/readme/list/groceryLists_created.png)

**Delete groceries list**

![Delete Groceries list page](src/assets/images/readme/list/groceryLists_delete_list.png)

![Delete Groceries list sucess notification](src/assets/images/readme/list/groceryLists_delete_list_sucess.png)

<br>

**View Groceries List** - on the groceries list page, users can edit the name/description of the list and manage the items

![Empty Groceries list page](src/assets/images/readme/groceries/groceriesLists_empty.png)

**Add items** - to add a new item users must fill out the name, quantity and categories fields.

![Add item to groceries list page](src/assets/images/readme/item/add_item.png)

**Groceries List with Item** - after successfully adding an item, the user will be redirected to the Groceries List page. A success notification will appear, and the user can manage the item through the "Actions" column in the table.

![Groceries list with item page](src/assets/images/readme/groceries/groceriesList.png)

**_Item Actions_**

**Check Item** - users can check off items to track their shopping progress. If needed users can uncheck them as well.

![Check off item in Groceries list page](src/assets/images/readme/groceries/groceriesList_check_item.png)

**Edit Item** - users can edit item´s data, if the item is unchecked.

![Edit item page](src/assets/images/readme/item/edit_item.png)

![Edit item sucess notification](src/assets/images/readme/item/edit_item_sucess.png)

**Remove Item** - users can remove an item from a groceries list, if the item is unchecked.

![Remove item page](src/assets/images/readme/item/remove_item.png)

<br>

# Dependencies

- **vite**: build tool and development server.
- **react 19**: used for building User Interfaces without refreshing the page.
- **react-router-dom**: used for routing.
- **firebase**: used for user authetication and real-time database.
- **react-icons**: used for the different icons from popular icon libraries (e.g. Font Awesome).
