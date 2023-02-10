# nabomcord

2023.02.01 ~

## File Description
- interface : 코드에서 사용되는 클래스들이 들어가져있는 폴더 입니다. 
  - ApplicationCommand : 슬래쉬 명령어들에서 사용되는 클래스입니다. data는 필수 hasSubcommands와 execute는 옵션입니다.
  - BaseCommand : 추상 클래스로 name과 description, execute을 담고 있습니다.
    - MessageCommand : BaseCommand에 확장한 prefix를 사용한 메세지 명령어들에서 사용되는 클래스 입니다.
  - SubCommand : 슬래쉬 명령어에서 그 하위 명령어들에게 사용되는 클래스입니다. execute만 존재합니다.
  - Event : 디스코드 봇의 Event에 대한 처리에 사용되는 클래스입니다.
  - DiscordButton : 출력되는 Button에 사용되는 클래스입니다. data는 필수 name, execute는 옵션입니다.
  
  
