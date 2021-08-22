# RSelenium with Firefox
rD <- RSelenium::rsDriver(browser="firefox", port=4546L, verbose=F)
remDr <- rD[["client"]]
remDr$navigate(url)

# Scroll down a couple of times to reach the bottom of the page
# so that additional data load dynamically with each scroll.
# Here I scroll 4 times, but perhaps you will need much more than that.
for(i in 1:4){      
  remDr$executeScript(paste("scroll(0,",i*10000,");"))
  Sys.sleep(3)    
}

# get the page source
web <- remDr$getPageSource()
web <- xml2::read_html(web[[1]])

# close RSelenium
remDr$close()
gc()
rD$server$stop()
system("taskkill /im java.exe /f", intern=FALSE, ignore.stdout=FALSE)

# now we can go on to our rvest code and scrape the data
winery_data <- web %>% html_nodes('.vintageTitle__winery--2YoIr') %>% html_text()
head(winery_data)
wine_name <- web %>% html_nodes('.vintageTitle__wine--U7t9G') %>% html_text()
wine_country <- web %>% html_nodes('.vintageLocation__anchor--T7J3k+ .vintageLocation__anchor--T7J3k') %>% html_text()
wine_region <- web %>% html_nodes('span+ .vintageLocation__anchor--T7J3k') %>% html_text()
wine_rating <- web %>% html_nodes('.vivinoRating__averageValue--3Navj') %>% html_text()
n_ratings <- web %>% html_nodes('.vivinoRating__caption--3tZeS') %>% html_text()