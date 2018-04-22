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
	private final String TOKEN = "sSjg3fS0PyX70iEBn9B4OVgGsKfz2WJauAXymBNm61bs2CrA53";
	private final String TOKEN_SECRET = "05GznVDePztHPl9vXqCx47dp5bw5gHiakF4FElHIuhXQ8xjbPe";
	private JumblrClient client;
	
	tumblrFSRestController() {
		this.client = new JumblrClient(this.CONSUMER_KEY, this.CONSUMER_SECRET);
		this.client.setToken(this.TOKEN, this.TOKEN_SECRET);
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/dashboard")
    public List<Post> dashboard(@RequestParam(value="offset", defaultValue="0") int offset) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset", offset);
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
