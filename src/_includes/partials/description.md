<section class="kdl-section" id="description">

KDL is a small, pleasing document language with xml-like semantics that looks
like you're invoking a bunch of CLI commands! It's meant to be used both as a
serialization format and a configuration language, much like JSON, YAML, or
XML. It looks like this:

```kdl
package {
  name "my-pkg"
  version "1.2.3"

  dependencies {
    // Nodes can have standalone values as well as
    // key/value pairs.
    lodash "^3.2.1" optional=true alias="underscore"
  }

  scripts {
    // "Raw" and multi-line strings are supported.
    build r#"
      echo "foo"
      node -c "console.log('hello, world!');"
      echo "foo" > some-file.txt
    "#
  }

  // `\` breaks up a single node across multiple lines.
  the-matrix 1 2 3 \
             4 5 6 \
             7 8 9

  // "Slashdash" comments operate at the node level,
  // with just `/-`.
  /-this-is-commented {
    this "entire" "node" {
      "is" "gone"
    }
  }
}
```

There's a living [specification](https://github.com/kdl-org/kdl/blob/main/SPEC.md), as well as various
[implementations](#implementations). You can also check out the [FAQ](#faq) to
answer all your burning questions!

In addition to a spec for KDL itself, there are also standard specs for [a KDL
Query Language](https://github.com/kdl-org/kdl/blob/main/QUERY-SPEC.md) based
on CSS selectors, and [a KDL Schema
Language](https://github.com/kdl-org/kdl/blob/main/SCHEMA-SPEC.md) loosely
based on JSON Schema.

The language is based on [SDLang](https://sdlang.org), with a number of
modifications and clarifications on its syntax and behavior.

The current version of the KDL spec is `1.0.0`.

[Play with it in your browser!](https://kdl-play.danini.dev/)

</section>
