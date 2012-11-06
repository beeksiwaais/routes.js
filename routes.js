var Routes = function(params) {
	
	this.indicator = params.indicator || "#!/";
	
	var pages = [],hash = this, current_page = "";

	hash.as_changed = function() {
		var windowHash = window.location.hash;

		var stop = false;
		if(~windowHash.indexOf(hash.indicator)) {
			current_page = windowHash.replace(hash.indicator, "");
			$.each(pages, function(index, value) {
				if(stop == false) {
					var search = new RegExp(value.slug);
					if( typeof value === "object" && search.test(current_page) ) {
						stop = true;
						var params = current_page.match(search);
						params.shift();
						if( current_page.strstr(params[params.length - 1]) != undefined) {
              params.push(current_page.strstr(params[params.length - 1]).split('/'));
            }
						value.callback.apply(hash, params);
					}
				}
			});
		}
	}

	hash.visit = function(page) {
		window.location.hash =  hash.indicator + page;
	}

	hash.register = function(slug, callback) {
		if( $.isArray(slug) ) {
			$.each(slug, function(index, value) {
				pages.push({slug: value, callback: callback});
			});
		} else {
			pages.push({slug: slug, callback: callback});
		}
		
	}

	hash.check = function() {
		if(window.location.hash) hash.as_changed();
	}

	hash.initialize = function(indicator) {
		if ("onhashchange" in window) {
			$(window).on('hashchange', function(e) {
				hash.as_changed();
			});
		}
	}
	hash.initialize();
}