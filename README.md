jQuery.htmlEncodedVal
=====================

Like $.val(), but gets, sets (or inline converts) input values to html encoded values. Useful for certain situations involving extended characters.

**For working examples see index.html.**


***Getters***

Get the value of an input, html-encoded:
<pre><code>var encodedVal = $("#myInput").htmlEncodedVal();</code></pre>

Get the value of an input, html-encoded - but protect any html code (protects "<,>,&," etc.):
<pre><code>var encodedVal = $("#myInput").htmlEncodedVal( true );</code></pre>


***Setters***

Set the value of an input, but html-encode it first:
<pre><code>$("#myInput").htmlEncodedVal( 'Τη γλώσσα μου έδωσαν ελληνική' );</code></pre>

Set the value of an input, but html-encode it first - but protect any html code:
<pre><code>$("#myInput").htmlEncodedVal( 'Τη γλώσσα μου έδωσαν ελληνική', true );</code></pre>


***Inline Conversion***

*This is useful for encoding form field values just before submitting a form.*

Convert the value of an input to be html-encoded. 
<pre><code>$("#myInput").htmlEncodedVal( { convertInline: true } );</code></pre>

Convert the value of an input to be html-encoded - but protect any html code: 
<pre><code>$("#myInput").htmlEncodedVal( true, true );</code></pre>


***License***
MIT License (Enjoy, and keep doing great things!)
