package ie.gmit.gct.test;

import static org.junit.Assert.*;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LogoutTest {

	@Test
	public void test() {
		WebDriver driver = new FirefoxDriver();
		driver.get("http://127.0.0.1:9000/");
		WebElement userName = driver.findElement(By.id("loginEmail"));
		userName.sendKeys("useremail@domain.com"); //replace it with admin email

		WebElement password = (new WebDriverWait(driver, 20))
				.until(ExpectedConditions.presenceOfElementLocated(By.name("password")));
		password.sendKeys("test");

		WebElement loginBtn = driver.findElement(By.name("login_btn"));
		loginBtn.click();//logs in
		
		WebElement logOut = driver.findElement(By.name("logout-lnk"));
		logOut.click();//logs out
		
		String loginLblCheck= driver.findElement(By.name("loginlbl")).getText();
		
		assertThat("Login", Matchers.is(loginLblCheck));//verify by the status of the link "Login"
	}

}
