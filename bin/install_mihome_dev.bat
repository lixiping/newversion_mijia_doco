@echo off
echo Ϊ���ⱻ����Ϊ��������ֹ������ǰ�� Windows ��ȫ���� ����������в���� ���������ùر� ʵʱ����
echo ��װ��ɺ��ٿ�������
pause

cd %userprofile%\
IF exist AppData\Local\mi (
  echo .
) ELSE ( 
  mkdir AppData\Local\mi
)
cd AppData\Local\mi

echo ������...
IF exist node.zip ( del node.zip )
certutil -urlcache -split -f https://npm.taobao.org/mirrors/node/v12.16.1/node-v12.16.1-win-x64.zip node.zip

echo ��ѹ��...
tar xf node.zip
IF exist node ( rmdir /Q /S node )
Rename  node-v12.16.1-win-x64  node
del node.zip

echo ������...
cd node
setlocal enabledelayedexpansion
setx PATH "%userprofile%\AppData\Local\mi\node;%~dp0;%PATH%"

cd "%userprofile%
REM node -v
REM npm -v

echo ��װ����
pause