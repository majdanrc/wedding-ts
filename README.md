# wedding-ts

calculatePrice.videoRecordingWithPhotographyWithSessionPrice and calculatePrice.videoRecordingWithPhotographyPrice tests were contradicting themselves, because when "package" discount was removed the videoRecordingWithPhotographyWithSessionPrice tests were green, but videoRecordingWithPhotographyPrice was failing.

The issue is that original implementation of videoRecordingWithPhotographyWithSessionPrice was calculating price without session by using ["VideoRecording", "Photography"], therefore having a higher discount due to this being a package.

I'm not sure if I got the requirements wrong, or this was on purpose. Branch https://github.com/majdanrc/wedding-ts/tree/playground/tests-check-package-discount contains the code with removed package dicsounts and an attempt to make price drop discounts more important, but from business perspective I don't think this is the right approach (of course tests are still failin on this branch)
