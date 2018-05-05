package es.tumblrFS.rest;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tumblr.jumblr.JumblrClient;
import com.tumblr.jumblr.types.Post;

@RestController
public class tumblrFSRestController {

	private final String CONSUMER_KEY = "rYDQyAQHEpbcyqbfNydHCvLu2NW1xaVmKopFvb9cFGS75fh5pD";
	private final String CONSUMER_SECRET = "JIrQXJJdlLSZRdguE65ZKqeEF1wvQ1GZ0Lh28GSUjEdAo2lw79";
	private final String TOKEN = "NY4ToBtEMqUgbViE5yoCbELbA1qS57QQaEYz8MpRL9iyEDRsWn";
	private final String TOKEN_SECRET = "WvVEDg8ww12EVy8YCH0gy1dsLYufKQGWGnWI3HFr0vtWODHgho";
	private JumblrClient client;
	
	tumblrFSRestController() {
		this.client = new JumblrClient(this.CONSUMER_KEY, this.CONSUMER_SECRET);
		this.client.setToken(this.TOKEN, this.TOKEN_SECRET);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/dashboard")
    public List<Post> dashboard(@RequestParam(value="since_id", defaultValue="0") String since_id) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("since_id", since_id);
		List<Post> posts = client.userDashboard(params);

		return posts;
    }
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/posts")
    public List<Post> posts() {
	
		// Make the request
		List<Post> posts = client.blogPosts("colorbrillante.tumblr.com");
		
		return posts;
	}
	
}
