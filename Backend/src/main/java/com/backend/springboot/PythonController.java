package com.backend.springboot;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.ProcessBuilder;

@RestController
public class PythonController{

	@GetMapping("/python")
	public String index() throws IOException, InterruptedException {
		/* Start the python script */
		ProcessBuilder processBuilder = new ProcessBuilder("python3", "python/hello.py");
    	processBuilder.redirectErrorStream(true);
    	Process process = processBuilder.start();

		/* Read the output into a string */
		BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
		StringBuilder builder = new StringBuilder();
		String line = null;
		while ( (line = reader.readLine()) != null) {
   			builder.append(line);
   			builder.append(System.getProperty("line.separator"));
		}
		String result = builder.toString();

		/* Return the string */
		return result;
	}
    
}