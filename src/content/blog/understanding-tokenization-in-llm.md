---
title: Understanding Tokenization in LLMs
date: 2026-07-08
author: Karan Pratap Singh Rathore
tags:
  - AI
  - LLM
excerpt: Why language models don't read words the way we do, and how tokenization shapes everything from cost to context length.
heroImage: /blog-images/tokenization.jpg
---

Before a large language model can do anything with your text, it has to break it into pieces it actually understands. That process is called tokenization, and it's one of those topics that looks simple on the surface but ends up explaining a surprising number of things: why LLMs struggle with counting letters in a word, why pricing is measured in "tokens" instead of words, and why context windows have hard limits.

## What is a token, really

A token is not a word and it's not a character. It's somewhere in between — a chunk of text that the model treats as a single unit. Depending on the tokenizer, a word like "tokenization" might be split into pieces like `token`, `ization`, while a common short word like "the" stays whole as a single token.

This is why token counts and word counts never match exactly. As a rough rule of thumb, one token is close to 4 characters or about three-quarters of a word in English.

## Why not just use whole words

The obvious approach — one token per word — breaks down almost immediately:

- **Vocabulary explosion.** English alone has hundreds of thousands of word forms, and that's before you add other languages, typos, slang, and code. A word-level vocabulary would either be huge or constantly hit unknown words.
- **Rare and unseen words.** If "photosynthesis" never appeared in training, a word-level model has no way to represent it at all.
- **No sharing between languages or forms.** "run", "running", and "runner" would be three unrelated symbols instead of clearly related ones.

Character-level tokenization solves the vocabulary problem but creates a new one: sequences become extremely long, since every single letter is its own token, which makes training and inference far more expensive and harder for the model to reason over longer spans.

## The middle ground: subword tokenization

Most modern LLMs use subword tokenization, and the most common algorithm behind it is **Byte Pair Encoding (BPE)**. The idea is straightforward:

1. Start with a vocabulary of individual characters (or bytes).
2. Look at the training data and find the most frequently occurring pair of adjacent symbols.
3. Merge that pair into a new single symbol and add it to the vocabulary.
4. Repeat this merging process thousands of times.

Over enough iterations, common words end up as single tokens (`the`, `is`, `model`), while rarer or compound words get split into meaningful chunks (`token` + `ization`, `un` + `happi` + `ness`). This gives you a vocabulary size you can control (commonly 30k–100k+ tokens) while still being able to represent literally any input by falling back to smaller pieces when needed.

Variants like **Byte-level BPE** (used in GPT models) operate on raw bytes instead of Unicode characters, which means the tokenizer can represent absolutely any input — emojis, unusual symbols, other scripts — without ever hitting an "unknown token" wall.

## Why this matters practically

- **Context windows are measured in tokens, not words.** A "128k context window" means 128,000 tokens, which is meaningfully less than 128,000 words once you factor in the ~0.75 words-per-token ratio.
- **API pricing is per token.** Denser tokenization (fewer tokens for the same text) directly lowers cost — this is one reason model providers keep iterating on their tokenizers.
- **Weird model behavior on character-level tasks makes sense once you see this.** Asking a model "how many letters are in 'strawberry'" is hard for it precisely because it doesn't see individual letters by default — it sees tokens, and a word might be one token or three depending on how the vocabulary happened to split it.
- **Non-English languages often use more tokens per word.** Languages with different scripts or morphology can end up needing more subword pieces per word than English does, which quietly affects both cost and effective context length for non-English text.

## Closing thought

Tokenization is the layer between raw text and the model's actual numeric input (each token maps to an integer ID, which then maps to an embedding vector). It's easy to skip past this step when just calling an API, but understanding it explains a lot of otherwise-confusing model behavior — and it's foundational once you start working on anything involving embeddings, RAG pipelines, or context management, since all of those are fundamentally operating on tokens, not words.