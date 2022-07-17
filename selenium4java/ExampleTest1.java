package newpackage;

import java.time.Duration;

import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Wait;
import org.openqa.selenium.support.ui.WebDriverWait;

public class ExampleTest1 {

	WebDriver driver;
	
	@BeforeEach
	public void setUp() {
		// Instantiate ChromeDriver as Chrome will be used here
		driver = new ChromeDriver();
	}
	
	@Test
	void testExample1() throws InterruptedException {		
		// Goto the web site we want
		driver.navigate().to("https://restaurantinfo.com/");
		
		// Verify we are at restaurantinfo.com by its Logo image
		WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(3));
		wait.until(ExpectedConditions.visibilityOf(
			driver.findElement(By.cssSelector(".bg-fixed.bg-top img[src = 'https://restaurantinfo.com/images/logo/logo-desktop.png']"))
		));
		
		String searchTerm = "Chef";
		driver.findElement(By.cssSelector(".ais-Autocomplete input")).sendKeys(searchTerm);
		
		By firstMatchingSuggestionLocator = By.cssSelector(
			"*[id = autosuggest] ul > li .py-2 .text-xl.mx-4.cursor-pointer");
		
		// Verify autocomplete is displayed
		wait.until(ExpectedConditions.textToBe(firstMatchingSuggestionLocator, searchTerm));
		
		// Click on first matching suggestion
		driver.findElement(firstMatchingSuggestionLocator).click();
		
		driver.findElement(By.cssSelector("*[id = autosuggest] > input[name = 'city_state']")).sendKeys("New York");
		wait.until(ExpectedConditions.textToBePresentInElementLocated(
			By.cssSelector(".autosuggest__results-item span.text-xl"),
			"New York, NY, USA"
		));
		
		// Click on entry New York, NY, USA
		driver.findElement(firstMatchingSuggestionLocator).click();
		
		// Search
		driver.findElement(By.xpath(".//button//*[text() = 'Search']")).click();

		// Verify result page is shown with 'New York, NY, USA' under Location
		wait.until(ExpectedConditions.presenceOfElementLocated(
			By.cssSelector(".ais-RefinementList input[value = 'New York, NY, USA']")
		));
	}
	
	@AfterEach
	public void tearDown() {
		if (driver != null) {
			driver.close();
			driver.quit();
		}
	}
	
}
