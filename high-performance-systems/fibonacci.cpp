#include <cstdio>
#include <cstdlib>

long long fibonacci(int n) {
  if (n == 1 || n == 2) {
    return 1;
  } else {
    return fibonacci(n - 2) + fibonacci(n - 1);
  }
}

int main(int argc, char* argv[]) {
  if (argc != 2) {
    printf("Need one argument: the number of Fibonacci numbers.");
    exit(-1);
  }

  printf("%lld\n", fibonacci(atoi(argv[1])));
  
  return 0;
}
