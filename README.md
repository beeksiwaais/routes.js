== Routes

Routes is a simple and easy to use hashchange event library.

```javascript
	routes = new Routes();
	
	// Simple example
	routes.register('/contact', function() {
		// load a contact page or do something
	});
	
	// Routes support Regex
	routes.register('/authors/([a-z0-9\-]*)/books/([a-z0-9\-]*), function(author, book) {
		// do something with author and book
	});
	
	
	// Change hash
	routes.visit('contact'); // > http://example.com/#!/contact
```