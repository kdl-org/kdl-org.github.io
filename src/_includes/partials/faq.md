<section class="kdl-section" id="faq">

## FAQ

#### Why yet another document language?

Because nothing out there felt quite right. The closest one I found was
SDLang, but that had some design choices I disagreed with.

#### Ok, then, why not SDLang?

SDLang is designed for use cases that are not interesting to me, but are very
relevant to the D-lang community. KDL is very similar in many ways, but is
different in the following ways:

* The grammar and expected semantics are [well-defined and specified](https://github.com/kdl-org/kdl/blob/main/SPEC.md).
* There is only one "number" type. KDL does not prescribe representations.
* Slashdash (`/-`) comments are great and useful!
* I am not interested in having first-class date types, and SDLang's are very
  non-standard.
* Values and properties can be interspersed with each other, rather than one
  having to follow the other.
* KDL does not have a first-class binary data type. Just use strings with base64.
* All strings in KDL are multi-line, and raw strings are written with
  Rust-style syntax (`r"foo"`), instead of backticks.
* KDL identifiers can use UTF-8 and are much more lax about symbols than SDLang.
* KDL does not support "anonymous" nodes.
* Instead, KDL supports arbitrary identifiers for node names and attribute
  names, meaning you can use arbitrary strings for those: `"123" "value"=1` is
  a valid node, for example. This makes it easier to use KDL for
  representing arbitrary key/value pairs.

#### Have you seen that one XKCD comic about standards?

Yes. I have. Please stop linking me to it.

#### What about YAML?

YAML is a great, widespread language. Unlike KDL, which is node-based (like
XML or HTML), it's based on map and array data structures, which can provide
an easier serialization experience in some cases.

At the same time, YAML can be ambiguous about what types the data written into
it is. There's also a persistent issue where very large YAML files become
unmanageable, especially due to the significant indentation feature.

KDL is designed to avoid these particular pitfalls by always being explicit
about types, and having clearly-delimited scope (and the ability to
auto-indent/auto-format). Syntax errors are easier to catch, and large files
are (hopefully!) much more manageable.

#### What about JSON?

JSON is a great serialization language, but it can be very difficult to use as
a human configuration language. This is largely due to its very specific, very
strict syntax, as well as its lack of support for comments.

KDL, on the other hand, has great comment support, and has a much more
forgiving syntax without being so flexible as to allow certain classes of
unfortunate mistakes. It also has much more flexibility around how to
represent data.

#### What about TOML?

It nests very poorly. It doesn't fare well with large files.

#### What about XML?

XML is actually pretty fantastic, and has long been a standard for data
exchange across many industries. At the same time, XML is known to be very
verbose, and editing it involves writing (and updating) matching tags. Another
large pitfall with XML is its lack of direct support for arbitrary string
key/value pairs, so what would be a simple `foo: x` in some languages has to
be represented as `<entry name="foo" value="x" />` or something similar. XML
also functions great as a **markup** language. That is, it is easy to
intersperse with text, like HTML.

KDL, just like XML, is a node/element-based language, but with much more
lightweight syntax. It also adds the ability to apply anonymous values
directly to a node, rather than as children. That is, `nodename 1 2 3` instead
of `<element><child>1</child><child>2</child>(etc)</element>`. This can make
it much more manageable and readable as a human configuration language, and is
also less verbose when exchanging documents across APIs!

Finally, KDL is **not** a markup language. XML or HTML do a much better job of
"marking up" a text document with special tags, although KDL can still be
useful for templating engines that want to be more strict about text
fragments.

</section>
