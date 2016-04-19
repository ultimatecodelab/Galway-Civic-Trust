package ie.gmit.gct.test;

import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginTest {

	//All the test has be done in local computer, because of security reason.
	//whatever works here works in the hosted environment too..
	@Test
	public void test() {
		WebDriver driver = new FirefoxDriver();
		driver.get("http://127.0.0.1:9000/");
		WebElement userName = driver.findElement(By.id("loginEmail"));
		userName.sendKeys("useremail@domain.com"); //replace this to whatever domain.com 

		WebElement password = (new WebDriverWait(driver, 20))
				.until(ExpectedConditions.presenceOfElementLocated(By.name("password")));
		password.sendKeys("test");

		WebElement loginBtn = driver.findElement(By.name("login_btn"));
		loginBtn.click();

	} //end of login test case... successfull..

}
