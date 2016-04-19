package ie.gmit.gct.test;

import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class EditTourTest {
	private WebDriver driver;

	@Before
	public void loginFirst() {
		driver = new FirefoxDriver();
		driver.get("http://127.0.0.1:9000/");
		WebElement userName = driver.findElement(By.id("loginEmail"));
		userName.sendKeys("useremail@domain.com"); // must replace this this registered (real email)

		WebElement password = (new WebDriverWait(driver, 5))
				.until(ExpectedConditions.presenceOfElementLocated(By.name("password")));

		password.sendKeys("test");
		WebElement loginBtn = driver.findElement(By.name("login_btn"));
		loginBtn.click();
	}

	@Test
	public void test() {
		WebElement editbtn = (new WebDriverWait(driver, 5))
				.until(ExpectedConditions.presenceOfElementLocated(By.name("edit-btn")));
		editbtn.click();

		// change the status
		WebElement checkBoxStatus = (new WebDriverWait(driver, 5))
				.until(ExpectedConditions.presenceOfElementLocated(By.id("later")));
		checkBoxStatus.click();

		WebElement titleInputField = (new WebDriverWait(driver, 5))
				.until(ExpectedConditions.presenceOfElementLocated(By.name("titlelbl")));
		titleInputField.clear();
		titleInputField.sendKeys("James my Nigga");

		WebElement saveChangesBtn = (new WebDriverWait(driver, 5))
				.until(ExpectedConditions.presenceOfElementLocated(By.id("loadButton")));
		saveChangesBtn.click();

		WebElement closePopUpModel = (new WebDriverWait(driver, 5))
				.until(ExpectedConditions.presenceOfElementLocated(By.name("closeBtn")));
		closePopUpModel.click();
	}

}
