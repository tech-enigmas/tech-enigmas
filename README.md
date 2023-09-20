# Tech-enigmas

## Authors: Emily, Josh, Christina

> **The Traveler's Quill** -
>A backend blog platform using Express that implements Inquirer library for NodeJS wherein blog posts will be created using CRUD functionality and stored in MongoDB

![overview](./img/overview.png)
![wireframe](./img/wireframe.png)
![schema-diagram](./img/schema-diagram.png)

### Using the The Traveler's Quill

- Running the app

  - node ./src/inquire/inquire.js
  - User input based prompt will ask your name
  - Use the up/down arrows to navigate the menu
    - **Create**
      - User input based prompts will ask for the title, author name and body of the blog
      - A confirmation message will show once the blog has been successfully submitted
    - **Read**
      - Use the up/down arrows to navigate the menu
      - Options are to view bog posts by title or by author
      - Once one of these options are selected, you can browse blog options to read
      - Once an option is selected you will be given three options, use the up/down arrows to navigate: return to the main menu, like the post or comment on the post
        - Once the user has 'liked' or commented on the post, they will be automatically returned to the main menu
    - **Update**
      - To edit an existing blog, select 'edit post' from the menu
      - Use up/down arrows to navigate the menu, selecting 'Return to main menu' will return to main menu
      - Once a post has been edited, the user will be automatically returned to the main menu
    - **Delete**
      - Users have the option to delete multiple blogs at once using the checkbox functionality of Inquirer
        - [a] selects all posts, [i] deselects, [space] selects a single post, [enter] proceeds to delete the selected item
        - Once a post has been deleted, the user will automatically be returned to the main menu
  - control C will end the user session
  