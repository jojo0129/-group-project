package egovframework.example.sample.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SampleTestController {
	@RequestMapping(value = "/sampleTest.do")
	public String sampleTest() {
		return "sample/sampleTest";
	}
}