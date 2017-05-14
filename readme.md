
# pull-audio-generator

> Generate audio as a pull-stream source

Creates [`AudioBuffer`](https://github.com/audiojs/audio-buffer)s using a function that returns samples between `-1..1`.  Also takes options to configure the stream and generated audio.

```js
pull(
  generator(Math.random, {
    duration: Infinity,
    bitDepth: 8,
    // ...
  }),
  drain(buf => {
    // got chunk
  })
)
```

## Install

```sh
npm install --save pull-audio-generator
```

```sh
yarn add pull-audio-generator
```

## Usage

### `generator(fn, options?)`

A [pull-stream source](https://github.com/pull-stream/pull-stream) that produces `AudioBuffer`s from `fn` and `options`.  All options are inherited from [`audio-generator`'s options](https://github.com/audiojs/audio-generator).

The `fn` takes `fn(time)` and returns `-1..1` for all channels or `[-1..1, -1..1, ...]` for each channel.

```js
pull(
  generate(time => {
    return [
      // Channel 1:
      Math.sin(Math.PI * 2 * time * 300),
      // Channel 2:
      Math.random()
    ]
  }),
  drain(buf => {
    // got chunk
  })
)
```

## Also see

 - [`audiojs`](https://github.com/audiojs) for all the audio components
 - [`pull-stream`](https://github.com/pull-stream/pull-stream) for minimal streams
 - [`audio-generator`](https://github.com/audiojs/audio-generator) for pure function of this module

