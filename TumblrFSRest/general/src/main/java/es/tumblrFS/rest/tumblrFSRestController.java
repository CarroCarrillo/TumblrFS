package es.tumblrFS.rest;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tumblr.jumblr.JumblrClient;
import com.tumblr.jumblr.types.Post;

@RestController
public class tumblrFSRestController {

	@RequestMapping("/dashboard")
    public List<Post> dashboard() {
		// Create a new client
		JumblrClient client = new JumblrClient(
		  "rYDQyAQHEpbcyqbfNydHCvLu2NW1xaVmKopFvb9cFGS75fh5pD",
		  "JIrQXJJdlLSZRdguE65ZKqeEF1wvQ1GZ0Lh28GSUjEdAo2lw79"
		);
		client.setToken(
		  "sSjg3fS0PyX70iEBn9B4OVgGsKfz2WJauAXymBNm61bs2CrA53",
		  "05GznVDePztHPl9vXqCx47dp5bw5gHiakF4FElHIuhXQ8xjbPe"
		);
		
		List<Post> posts = client.userDashboard();

		return posts;

    }
}
