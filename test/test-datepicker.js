QUnit.test("testtoSpanishDateString", function(assert) {
	assert.notEqual(toSpanishDateString(new Date(2014, 0, 1)), "1/1/2014");
	assert.equal(toSpanishDateString(new Date(2014, 0, 1)), "01/01/2014");
	assert.equal(stringtoSpanishDateString("1/2/2014"), "01/02/2014");
	assert.equal(stringtoSpanishDateString("01/02/2014"), "01/02/2014");
});

QUnit.test("testtoSpanishStringArray", function(assert) {
	var fixedArray = jQuery.map(["1/2/2014", "11/12/2016"], stringtoSpanishDateString);
	assert.equal(fixedArray[0], "01/02/2014");
	assert.equal(fixedArray[1], "11/12/2016");
});

QUnit.test("testTrimDateLines", function(assert) {
	assert.equal(jQuery.trim("  1/1/2014\n   3/5/2015 \n 4/8/2015\n"), "1/1/2014\n   3/5/2015 \n 4/8/2015");
	assert.equal(jQuery.trim("  1/1/2014\n   3/5/2015 \n 4/8/2015\n  "), "1/1/2014\n   3/5/2015 \n 4/8/2015");
	assert.equal(jQuery.trim("  1/1/2014\n   3/5/2015 \n 4/8/2015  \n  "), "1/1/2014\n   3/5/2015 \n 4/8/2015");
});

QUnit.test("testReplaceSpaces", function(assert) {
	assert.equal(" 1/1/2014\n   3/5/2015 \n 4/8/2015 \n  "/replace(/ /g,''), "1/1/2014\n3/5/2015\n4/8/2015\n");
});

QUnit.test("testReplaceLineBreaks", function(assert) {
	assert.equal("1/1/2014\n3/5/2015\n 4/8/2015\r\n"/replace(/\r\n/g, '\n'), "1/1/2014\n3/5/2015\n 4/8/2015\n");
});

QUnit.test("testCleanDisabledDateLines", function(assert) {
	assert.equal(cleanDisabledDateString("  1/1/2014\n   3/5/2015 \n 4/8/2015 \n  "), "1/1/2014\n3/5/2015\n4/8/2015");
});

QUnit.test("testLinesToArrayDisabledDates", function(assert) {
	var input = "1/2/2014\n3/5/2015 \n 4/8/2015\r\n";
	var lines = cleanDisabledDateString(input).split("\n");
	var mappedLines = jQuery.map(lines, stringtoSpanishDateString);
	assert.equal(mappedLines[0], "01/02/2014");
	assert.equal(mappedLines[1], "03/05/2015");
	assert.equal(mappedLines[2], "04/08/2015");
});

QUnit.test("testLoadTestDatafileFromServer", function(assert) {
	var done = assert.async();
	jQuery.get("//leipzigmisteriosa.de/wordpress/wp-content/themes/leipzigmisteriosa/test/data.txt", function(data) {
		assert.ok(data.toString().length > 0);
		assert.notEqual(data.toString().indexOf("1/2/2014"), -1);
		assert.notEqual(data.toString().indexOf("1/2/2014\r\n03/05/2015\r\n04/08/2015"), -1);
		done();
	});
});

QUnit.test("testCleanDisabledDateStringAndLineMaptoSpanishStringWithZeros", function(assert) {
	var done = assert.async();
	jQuery.get("//leipzigmisteriosa.de/wordpress/wp-content/themes/leipzigmisteriosa/test/data.txt", function(data) {
		var lines = cleanDisabledDateString(data).split("\n");
		var mappedLines = jQuery.map(lines, stringtoSpanishDateString);
		assert.equal(mappedLines[0], "01/02/2014");
		assert.equal(mappedLines[1], "03/05/2015");
		assert.equal(mappedLines[2], "04/08/2015");
		done();
	});
});

QUnit.test("testTransformDateLinesToArrayTestData", function(assert) {
	var done = assert.async();
	jQuery.get("//leipzigmisteriosa.de/wordpress/wp-content/themes/leipzigmisteriosa/test/data.txt", function(data) {
		var mappedLines = transformDateLinesToArray(data);
		assert.equal(mappedLines[0], "01/02/2014");
		assert.equal(mappedLines[1], "03/05/2015");
		assert.equal(mappedLines[2], "04/08/2015");
		done();
	});
});

QUnit.test("testIsDateDisabled", function(assert) {
	var done = assert.async();
	jQuery.get("//leipzigmisteriosa.de/wordpress/wp-content/themes/leipzigmisteriosa/test/data.txt", function(data) {
		var mappedLines = transformDateLinesToArray(data);
		assert.equal(mappedLines[0], "01/02/2014");
		assert.equal(mappedLines[1], "03/05/2015");
		assert.equal(mappedLines[2], "04/08/2015");
		assert.ok(jQuery.inArray(toSpanishDateString(new Date(2015, 7, 4)), mappedLines) >= 0);
		assert.ok(jQuery.inArray(toSpanishDateString(new Date(2015, 8, 4)), mappedLines) == -1);
		assert.ok(isDateDisabled(new Date(2015, 7, 4), mappedLines));
		assert.ok(!isDateDisabled(new Date(2015, 8, 4), mappedLines));
		done();
	});
});

QUnit.test("testFunctionReadAndCleanRealData", function(assert) {
	var done = assert.async();
	jQuery.get("//leipzigmisteriosa.de/wordpress/wp-content/themes/leipzigmisteriosa/js/data.txt", function(data) {
		assert.ok(data.toString().length > 0);
		done();
	});
});