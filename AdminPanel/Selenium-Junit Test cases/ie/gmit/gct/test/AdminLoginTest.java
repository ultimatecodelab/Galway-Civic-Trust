package ie.gmit.gct.test;

import static org.junit.Assert.assertThat;

import org.hamcrest.Matchers;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class AdminLoginTest {

	@Test
	public void test() {
		WebDriver driver = new FirefoxDriver();
		driver.get("http://127.0.0.1:9000/");
		WebElement userName = driver.findElement(By.id("loginEmail"));
		userName.sendKeys("admin@gct.ie");

		WebElement password = (new WebDriverWait(driver, 20)).until(ExpectedConditions.presenceOfElementLocated(By.name("password")));
		
		password.sendKeys("test");
		WebElement loginBtn = driver.findElement(By.name("login_btn"));
		loginBtn.click();
		
		String welcomeMsg = (new WebDriverWait(driver, 10))
				.until(ExpectedConditions.presenceOfElementLocated(By.name("user-welcome"))).getText();
		
		
		assertThat(welcomeMsg, Matchers.is("Welcome,Admin"));
		
		assertThat(welcomeMsg, Matchers.either(Matchers.is("Welcome,Admin")).or(Matchers.is("System User Registration"))); //verify msg status...
	}

}
