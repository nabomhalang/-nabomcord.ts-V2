# nabomcord

2023.02.01 ~

## File Description
- interface : 코드에서 사용되는 클래스들이 들어가져 있는 폴더 입니다.
  - ApplicationCommand : 슬래쉬 명령어들에서 사용되는 클래스입니다.
  - BaseCommand : 추상 클래스로 name과 description, execute을 담고 있습니다.
    - MessageCommand : BaseCommand에 확장한 prefix를 사용한 메세지 명령어들에서 사용되는 클래스 입니다.
  - SubCommand : 슬래쉬 명령어에서 그 하위 명령어들에게 사용되는 클래스입니다.
  - Event : 디스코드 봇의 Event에 대한 처리에 사용되는 클래스입니다.
- DiscordButton : 출력되는 Button에 사용되는 클래스입니다.
- information : 다수의 명령어들을 출력해줘야할 때 그 정보들이 JSON파일 형태로 담겨져있는 폴더 입니다.
- events : 디스코드 봇이 작동할때 일어나는 이벤트를 컨트롤해주는 코드들이 있는 폴더 입니다.
  - client : 클라이언트에 관련된 error, ready, warn과 같은걸 담고 있는 폴더 입니다.
  - interaction : messageInteraction, interactioncCreate와 같은 interaction에 관련된 것들을 처리해주는 코드를 담고 있는 폴더 입니다.
- commands : 모든 커맨드에 관련된 파일이 존재하는 곳 입니다.
  - messageCommands : prefix로 작동하는 커맨드들이 존재하는 곳 입니다.
  - slashCommands : slash로 작동하는 커맨드들이 존재하는 곳 입니다.
  - subCommands : slash에서 서브로 작동해야하는 커맨드들이 존재하는 곳 입니다.
- button : 버튼 상호작용 필요할 때 사용되는 버튼들의 템블릿들이 존재하는 곳 입니다.


## Slash commands & button
- commands파일안에 slashCOmmands라는파일에 카테고리 폴더를 만들고 그 안에 Slash Commands를 만들어줍니다.
- buton은 button폴더안에 카테고리 구분없이 바로 (.js/.ts)파일을 만들어줍니다.
- 작동방식은 interactionButton.ts에 있듯이 입력했던 명령어에서 뛰여쓰기만 제외한 파일이름을 button폴더에서 import해 옵니다. 그렇기 때문에 만약 `/music info`라고 명령어를 만들었다면 button폴더에 `musicinfo.ts`라고 이름을 붙여줘야됩니다.

## Slash commands & Sub commands
- Slash commands에서 Sub commands를 만들땐 ApplicationCommand Class의 hasSubCommands만 true로 설정해주면 됩니다. 이때 execute는 필요하지 않습니다.
- 폴더 이름과 파일이름에 주의해주셔야합니다. ApplicationCommand Class에서 확인할 수 있듯이 subCommands폴더 안에 Slashcommands의 이름과 같은 폴더가 존재하고 그안에 subcommand같은 경우는 (.ts/.js) 파일은 생성하여 Subcommand class로 작성하면 됩니다. 만약 subcommandGroup까지 있다면 그 그룹 이름의 폴더가 존재해야하고 그 안에 (.ts/.js)파일을 만들어 subcommand를 작성하면 됩니다.
  
