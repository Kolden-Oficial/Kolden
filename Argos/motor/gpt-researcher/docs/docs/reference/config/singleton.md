---
sidebar_label: singleton
title: config.singleton
tipo: doc
area: Argos
up: "[[Argos/_MOC-argos]]"
relacionado:
  - "[[Argos/motor/gpt-researcher/docs/docs/reference/config/config|config]]"
---

The singleton metaclass for ensuring only one instance of a class.

## Singleton Objects

```python
class Singleton(abc.ABCMeta, type)
```

Singleton metaclass for ensuring only one instance of a class.

#### \_\_call\_\_

```python
def __call__(cls, *args, **kwargs)
```

Call method for the singleton metaclass.

## AbstractSingleton Objects

```python
class AbstractSingleton(abc.ABC, metaclass=Singleton)
```

Abstract singleton class for ensuring only one instance of a class.

