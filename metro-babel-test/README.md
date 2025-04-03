## 테스트 방법

1. 메트로 서버 실행

```bash
npx metro serve --reset-cache
```

> `--reset-cache` 플래그는 이전 번들 결과나 Babel 변환 캐시로 인해
> 테스트가 정확하지 않을 수 있으므로 항상 사용하는 것을 권장합니다.

2. 브라우저에서 번들 요청

```bash
http://localhost:8081/index.bundle?platform=android&dev=true
```

- `platform=android`은 Android 환경을 지정합니다.
- `dev=true`는 개발 모드에서 실행되도록 설정합니다. (오류 메시지나 소스맵이 포함되어 디버깅에 유리합니다.)
