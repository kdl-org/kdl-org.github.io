<section class="kdl-section" id="overview">

## Overview

### Basics

A KDL node is a node name, followed by zero or more "arguments", and
children.

```kdl
title "Hello, World"
```

You can also have multiple values in a single node!

```kdl
bookmarks 12 15 188 1234
```

Nodes can have properties.

```kdl
author "Alex Monad" email="alex@example.com" active=true
```

And they can have nested child nodes, too!

```kdl
contents {
  section "First section" {
    paragraph "This is the first paragraph"
    paragraph "This is the second paragraph"
  }
}
```

Nodes without children are terminated by a newline, a semicolon, or the end of
a file stream:

```kdl
node1; node2; node3;
```

### Values

KDL supports 4 data types:

* Strings: `"hello world"`
* Numbers: `123.45`
* Booleans: `true` and `false`
* Null: `null`

#### Strings
It supports two different formats for string input: escaped and raw.

```kdl
node "this\nhas\tescapes"
other r"C:\Users\zkat\"
```
Both types of string can be multiline as-is, without a different syntax:

```kdl
string "my
multiline
value"
```

And for raw strings, you can add any number of # after the r and the last " to
disambiguate literal " characters:

```kdl
other-raw r#"hello"world"#
```

#### Numbers

There's 4 ways to represent numbers in KDL. KDL does not prescribe any
representation for these numbers, and it's entirely up to individual
implementations whether to represent all numbers with a single type, or to
have different representations for different forms.

KDL has regular decimal-radix numbers, with optional decimal part, as well as
an optional exponent.

```kdl
num 1.234e-42
```

And using the appropriate prefix, you can also enter hexadecimal, octal, and
binary literals:

```kdl
my-hex 0xdeadbeef
my-octal 0o755
my-binary 0b10101101
```

Finally, all numbers can have underscores to help readability:

```kdl
bignum 1_000_000
```

### Comments

KDL supports C-style comments, both line-based and multiline. Multiline
comments can be nested.

```kdl
// C style

/*
C style multiline
*/

tag /*foo=true*/ bar=false

/*/*
hello
*/*/
```

On top of that, KDL supports `/-` "slashdash" comments, which can be used to
comment out individual nodes, arguments, or children:

```kdl
// This entire node and its children are all commented out.
/-mynode "foo" key=1 {
  a
  b
  c
}

mynode /-"commented" "not commented" /-key="value" /-{
  a
  b
}
```

### Type Annotations

KDL supports type annotations on both values and nodes. These can be
arbitrary, but can be used by individual implementations or use-cases to
constrain KDL's basic types. A number of type names are also reserved to have
specific meanings.

```kdl
numbers (u8)10 (i32)20 myfloat=(f32)1.5 {
  strings (uuid)"123e4567-e89b-12d3-a456-426614174000" (date)"2021-02-03" filter=(regex)r"$\d+"
  (author)person name="Alex"
}
```

### More Details

```kdl
// Nodes can be separated into multiple lines
title \
  "Some title"


// Files must be utf8 encoded!
smile "😁"

// Instead of anonymous nodes, nodes and properties can be wrapped
// in "" for arbitrary node names.
"!@#$@$%Q#$%~@!40" "1.2.3" "!!!!!"=true

// The following is a legal bare identifier:
foo123~!@#$%^&*.:'|/?+ "weeee"

// And you can also use unicode!
ノード　お名前="☜(ﾟヮﾟ☜)"

// kdl specifically allows properties and values to be
// interspersed with each other, much like CLI commands.
foo bar=true "baz" quux=false 1 2 3
```

</section>
