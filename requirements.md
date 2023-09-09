# The Traveler's Quill

> **Vision**: This blog post capability allows users to create blog posts about their travels, submit them for approval to be posted to a main database of blog posts that other users can search for and read. This project give users a space to share their stories with others and read/learn about other people's travel experiences. The product creates a space for users to build connections based on common interests.

## Scope

- **IN**

- This web app will allow users to create and submit blog posts for approval to be viewed by the traveling community.
- Users will have the capability to read posts made by other contributors.
- Blog posts will be stored long term.
- Amins will have the capability to read, update and delete blog posts created by users based on post id
- Each user has a unique user id that the unique blog post will be linked to (post will contain the user id of the user who created the post)

- **OUT**

- Product will not have browser interface.
- Users will not have individual profiles - posts will be sent to a pool of blog posts, not individual pages.
- Users will not be able to post pictures to blog posts - text only

## MVP

- Product will have contributor and admin roles.
- Product will implement CRUD functionality based on role based access control.
- Product will store blog posts in a database using MongoDB
- Product will implement the Inquirer library to allow users to navigate a menu to choose to create a post or read other user's posts and to create a blog post with the specified schema: email, password, blog

- **Stretch Goals**

- Using Inquirer, users will be able to search and filter blog posts with specific key words or blog id's to find posts they want to read
- "Like/Comment" option so users can interact with each others posts

## Functional Requirements

- Admin can approve and publish posts made by contributors
- Admin can delete/remove blog posts from the site
- Admin can assign user roles and delete users
- Contributors can write posts to submit for approval
- Contributors can read posts created by other users
- Blog posts will be stored long term using MongoDB

### Data Flow

- User will login (or create a login with a username and password if this is their first time using the app)
- To log in the user will enter their username and password (if either is incorrect they will be prompted to retry)
- Once logged in, the user will be either an admin or a contributor
  - A contributor will have a list of options:  create a post, read posts, or logout
    - If the contributor chooses to *create a post*, they will be given two options: create a title or go back
      - After creating a title, they will be given two options: write a blog or go back
      - After writing the blog they will be given two options: submit for approval or go back
    - If the contributor chooses to *read approved posts*, they will be given two options: show all approve posts or go back
      - After choosing 'show all approved posts', they will be given two options: select a title (using the up/down arrows) or go back
        - After choosing a title they can read the post, then select 'go back'

  - An admin will be given three options after they're logged in: manage content, read approved posts, create a post
  
    - If the admin selects '*manage content*', they will be given two options: manage posts(or go back) and manage users(or go back)
      - If they select '*manage posts*', they will be given two options: delete post by id(or go back) or approve post(or go back)

        - If the admin selects '*delete post by id*' they will be prompted to enter the post id and will be prompted to delete(y/n)
        - If the admin selects '*approve post*', they will be given a queue of post titles to select from
          - Once they have selected a post, they are given two options: approve or deny
            - If they select '*approve*', the post will be moved to a queue of approved posts that all users can see
            - If they select '*deny*', the post will be dequeued from the list (deleted)
      - If they select *'manage users'*, they will be given two options: delete user by id(or go back) and assign user role by id(or go back)
        - If they select '*delete user by id*' they will be prompted to enter the user id to delete, confirm the id, then they will be given the message 'user id# deleted'
        - If they select '*assign user role by id*' they can either go back or enter the user id they would like to assign a role to
          - Once the user id is entered, they are given two role options to choose from: admin or contributor
          - Once a role is assigned they will be given the option to go back to the main menu
      - If the admin selects '*read approved posts*' they will be shown all approved block posts by title and have the option to go back

        - The admin can then select a title using the up/down arrows
        - Once the admin selects the title, they can read the post and then select 'go back'
    - If the admin selects '*create a post'* they can then create a title (or go back)
      - Once they've created the title they will be able to write the blog (or go back)
      - Once the blog is written, they can submit

## Non-Functional Requirements

- Scalability - the app will be scalable horizontally by adding interactive functionality where users can like and comment on each others posts. An infinite amount of users can send in blog posts to be approved and submitted to the blog queue to be read by all users.

- Testability - the app will be testable for CRUD functionality for both admin and contributor user roles. CRUD functionality can be tested for all posts as well as individual posts and individual users based on id

priorities! 1-5 goals with stretchgoals within the lists of what admins and users can do - if run out of time we can cut some things