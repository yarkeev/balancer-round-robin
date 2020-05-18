# balancer-round-robin

balancer-round-robin is a weighted round robin resource pool. Algorithm is similar to Nginx.

## Install

```
npm install balancer-round-robin
```

## Usage

```
const { UpstreamList } = require('balancer-round-robin');

const upstreams = new UpstreamList();

// Set upstreams list
upstreams.setList([
    { server: 'http://127.0.0.1', weight: 1, maxFails: 1, failTimeout: 5000 },
    { server: 'http://127.0.0.2', weight: 1, maxFails: 1, failTimeout: 5000 },
    { server: 'http://127.0.0.3', weight: 2, maxFails: 2, failTimeout: 2000 },
    { server: 'http://127.0.0.4', weight: 2, maxFails: 2, failTimeout: 2000 },
]);

...

// Add upstream
upstreams.add({
    server: 'http://127.0.0.5',
    weight: 3,
    maxFails: 1,
    failTimeout: 1000,
});

...

// Get upstream from pool
const upstream = upstreams.get();

request(`${upstram.server}/url`, (error, response, body) => {
    if (error) {
        // Mark upstream as failed
        upstream.fail();
    }
});
```
