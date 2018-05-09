
import os
import sys
import shutil
from lib.util import execute_stdout, scoped_cwd

NPM = 'npm'
if sys.platform in ['win32', 'cygwin']:
  NPM += '.cmd'


def main():
  args = [NPM, 'run', 'build', '--', sys.argv[2], sys.argv[3], sys.argv[4]]
  with scoped_cwd(sys.argv[1]):
    execute_stdout(args, os.environ.copy())

if __name__ == '__main__':
  sys.exit(main())
