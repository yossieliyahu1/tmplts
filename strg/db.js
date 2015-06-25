

var db = {


	feeds: function (prdct) {

		// goto db

		return [

			{
				"name": "tmz",
				"content" : "music",
				"link": "http://www.tmz.com/category/music/rss.xml"
			},
			{
				"name": "buzzfeed",
				"content": "music",
				"link": "http://www.buzzfeed.com/music.xml"
			},
			{
				"name": "people",
				"content": "celeb photos",
				"link": "http://rss.people.com/web/people/rss/photogalleries/index.xml"
			}

		]

	}


}

module.export = db;