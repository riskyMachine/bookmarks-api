# bookmarks-api

##### Run `npm install` Then `npm start`
Make sure mongo daemon is running in the background.

### Bookmark Routes
POST: '/bookmarks/create'    # Creates bookmark and user
Required Body: name , email, link, title, publisher

DELETE: '/bookmarks/delete'     # Deletes bookmark
Required Body: link, email

GET: '/bookmarks/get'    # Retrieves all bookmark
Required Body: email

### Tags Routes
POST: '/tags/create'    # Creates tags
Required Body: name, email, tags(Array of strings)

GET: '/tags/get'    # Retrieves all tags
Required Body: email

DELETE: '/tags/delete'   # Deletes existing tags
Required Body: email, tags(Array of strings)

### Display Routes
POST: '/tags/add'   # Adds tags to bookmark
Required Body: email, link, tags(Array of strings)

POST: '/tags/remove'    # Removes tags from bookmark
Required Body: email, link, tags(Array of strings)
