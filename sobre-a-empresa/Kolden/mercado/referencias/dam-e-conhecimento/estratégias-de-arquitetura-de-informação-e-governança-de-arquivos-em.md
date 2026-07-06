---
id_fonte: "dc6906f8-7241-476c-a91a-8b91d0d17a2f"
notebook_id: "1eb3e160-2c74-42dc-aff2-9b95a5fb44c6"
notebook_titulo: "Kolden"
titulo: "Estratégias de Arquitetura de Informação e Governança de Arquivos em Ecossistemas de Marketing e Publicidade"
tipo: "unknown"
url_original: null
keywords: "('Information Architecture', 'Digital Governance', 'Asset Management', 'Naming Conventions', 'Process Automation')"
summary: "This text outlines a strategic framework for managing digital assets within large-scale marketing and advertising ecosystems, shifting the focus from individual file storage to **institutional governance**. It argues that high-performance agencies must adopt **standardized folder architectures** and strict **Shared Drive protocols** to ensure business continuity and operational efficiency. Central to this approach is the implementation of **systematic naming conventions**—using ISO dates and status tags—and the **automation of workflows** through tool integration and granular access controls. Ultimately, the source serves as a roadmap for evolving from basic cloud storage toward sophisticated **Digital Asset Management (DAM)** systems, treating organized data as a critical pillar of competitive advantage."
extraido_em: "2026-06-30T16:12:22Z"
extraido_por: "notebooklm-py-0.7.3"
---

# Estratégias de Arquitetura de Informação e Governança de Arquivos em Ecossistemas de Marketing e Publicidade

### Estratégias de Arquitetura de Informação e Governança de Arquivos em Ecossistemas de Marketing e Publicidade

A gestão de ativos digitais e a organização documental em agências de publicidade e departamentos de marketing de grande escala deixaram de ser meras tarefas administrativas para se tornarem pilares de eficiência operacional e vantagem competitiva. No cenário contemporâneo, onde a produção de conteúdo é incessante e multiplataforma, a incapacidade de localizar um arquivo ou a utilização de uma versão desatualizada de um ativo de marca pode resultar em prejuízos financeiros significativos e danos à reputação.[1, 2] As maiores holdings de comunicação do mundo, como WPP, Omnicom e Publicis, enfrentam o desafio de gerenciar trilhões de bytes de dados distribuídos por milhares de escritórios globais, o que exige uma abordagem de arquitetura de sistemas de arquivos que seja ao mesmo tempo rígida em sua governança e flexível em sua aplicação criativa.[3, 4, 5]
A transição para ambientes de nuvem, especificamente o Google Drive dentro do ecossistema Google Workspace, introduziu um novo paradigma de colaboração, mas também amplificou o risco de desorganização se não houver uma infraestrutura lógica subjacente.[1, 6] O "cenário ideal" que muitas empresas buscam não reside em uma estrutura de pastas milagrosa, mas em um sistema de governança que integra convenções de nomenclatura, níveis de permissão granulares e a integração com outras ferramentas de gestão de projetos e automação.[7, 8]

#### A Mudança de Paradigma: Da Propriedade Individual à Governança Institucional

Historicamente, o fluxo de trabalho em agências era centrado no indivíduo ou em pequenos silos criativos. Arquivos eram armazenados em discos rígidos locais ou contas pessoais de armazenamento em nuvem, o que criava o fenômeno dos "arquivos órfãos" sempre que um colaborador deixava a organização.[8] Para as grandes empresas de marketing, a primeira etapa na busca pela organização ideal foi a abolição do uso do "Meu Drive" para fins profissionais em favor dos "Drives Compartilhados" (Shared Drives).[6]
Diferente do modelo tradicional onde o criador do arquivo é seu proprietário, nos Drives Compartilhados a propriedade pertence à organização. Essa distinção é fundamental para a continuidade dos negócios. Se um diretor de arte se desliga da agência, todos os projetos em que trabalhou permanecem acessíveis e inalterados no Drive Compartilhado da equipe.[6, 8] Além disso, a gestão centralizada permite que administradores de TI configurem políticas de segurança que impedem que arquivos sensíveis sejam movidos para fora do domínio da empresa ou compartilhados indiscriminadamente com links públicos.[8, 9]
| Característica | Meu Drive (Individual) | Drive Compartilhado (Corporativo) |
| ------ | ------ | ------ |
| Propriedade do Arquivo | Do indivíduo que criou | Da organização (domínio) |
| Continuidade | Arquivos podem ser excluídos se a conta for deletada | Arquivos permanecem independentemente da conta |
| Gestão de Permissões | Manual e por arquivo/pasta | Centralizada e herdada por nível de drive |
| Colaboração Externa | Difícil de controlar e auditar | Restrita por políticas de governança e grupos |
| Recuperação de Dados | Depende do usuário | Facilitada por ferramentas de admin e cofre (Vault) |

A implementação dessa estrutura exige que cada Shared Drive tenha um propósito claro e focado. As maiores agências evitam criar um único drive gigante para todos os clientes, optando por segmentar o ambiente em drives por cliente, por departamento ou por projeto de grande escala.[6] Isso reduz a "fadiga de cliques" e limita o raio de exposição em caso de violação de acesso a uma única conta.[6, 8]

#### Arquitetura de Pastas: O Modelo de Hub e Raios

As empresas que alcançam o cenário ideal de organização tratam o Google Drive como um componente de um "sistema operacional" de negócios mais amplo.[7] A estrutura de pastas é geralmente dividida em duas grandes categorias: Ativos de Cliente (Client Files) e Operações Internas (Agency Operations).[2]

##### A Estrutura Centrada no Cliente

Para as contas de clientes, a padronização é o que permite a escalabilidade. Uma agência não pode permitir que o time da "Conta A" se organize de forma diferente do time da "Conta B".[1, 10] A estrutura de pastas deve ser idêntica em todos os Shared Drives de clientes, frequentemente automatizada por scripts de criação de pastas sempre que um novo contrato é assinado.[11]
A hierarquia recomendada para uma pasta de cliente segue níveis de profundidade controlada, geralmente não excedendo quatro camadas, para garantir que os arquivos sejam encontrados com rapidez.[1] O primeiro nível dentro da pasta do cliente costuma ser dividido por áreas funcionais ou tipos de entrega.
| Nível 1: Categoria | Nível 2: Subcategoria / Conteúdo | Objetivo Estratégico |
| ------ | ------ | ------ |
| 00\_Admin\_Financeiro | Contratos, Notas Fiscais, SOWs | Centralizar documentação legal e financeira |
| 01\_Branding\_Assets | Logos, Fontes, Manuais de Identidade | Garantir consistência visual em todas as peças |
| 02\_Estrategia\_Briefing | Planejamento, Pesquisas de Mercado | Servir de base intelectual para o projeto |
| 03\_Campanhas\_Ativas | Pastas por campanha (Nome\_Data) | Organizar o fluxo de trabalho em execução |
| 04\_Ativos\_Brutos | Fotos originais, Filmagem sem edição | Preservar o material fonte para reutilização |
| 05\_Entregas\_Finais | Arquivos exportados e aprovados | Facilitar o acesso do cliente ao produto final |
| 06\_Relatorios\_Performance | Dashboards, Mensurações, ROI | Provar o valor do trabalho realizado |
| 99\_Arquivo\_Morto | Projetos cancelados ou anos anteriores | Limpar a área de trabalho ativa sem perder dados |

Dentro de "03\_Campanhas\_Ativas", o uso de subpastas por projeto individual deve seguir uma nomenclatura temporal ou temática. O "segredo" das grandes agências é que estas pastas não são apenas depósitos, mas espelham o progresso do trabalho.[1, 12]

##### Operações Internas e o "Wheel Hub"

Internamente, a agência se organiza como um cubo central de operações com raios que se estendem para os departamentos.[7] Esta área do Drive é restrita aos colaboradores internos e contém a memória institucional da empresa.

* **Vendas e Prospecção:** Contém modelos de propostas (decks), estudos de caso e apresentações credenciais. É essencial que estes arquivos sejam fáceis de localizar para que o time comercial não perca tempo recriando materiais.[2]
* **Marketing Próprio:** Ativos de marca da própria agência, planos para redes sociais e materiais de assessoria de imprensa.[1, 2]
* **Recursos Humanos e Cultura:** Manuais do colaborador, documentos de treinamento (onboarding) e registros de feedback. O acesso a estas pastas é estritamente controlado via Google Groups.[6, 7]
* **Financeiro e Jurídico:** Contas a pagar/receber, documentos societários e impostos. Esta área geralmente possui as restrições mais severas de compartilhamento externo.[2, 3]

#### Nomenclatura de Arquivos: O Idioma da Busca Eficiente

Um dos maiores obstáculos para o cenário ideal de pastas é a falha na busca. No Google Drive, a busca é poderosa, mas depende da qualidade dos nomes dos arquivos.[1, 13] As maiores agências instituem uma "Fórmula de Nomenclatura" obrigatória que elimina termos vagos como "final\_v2" ou "apresentacao\_nova".[1, 14]
A convenção de nomenclatura deve ser consistente, descritiva e cronológica.[13, 15, 16] A estrutura mais robusta adotada por empresas globais é:

---

##### Componentes da Fórmula de Sucesso

1. **Data ISO (YYYY-MM-DD):** O uso do formato internacional de data garante que o Google Drive ordene os arquivos cronologicamente por padrão, independentemente de quando foram editados pela última vez.[1, 14, 15] Por exemplo, todos os arquivos de 2025 começarão com "2025", seguidos pelo mês e dia, permitindo uma varredura visual imediata.
2. **Delimitadores:** O uso de underscores (\_) ou hífens (-) em vez de espaços é uma prática herdada do desenvolvimento de software e gestão de ativos que evita erros em URLs e facilita a exportação de arquivos para sistemas de veiculação.[13, 15, 17]
3. **Tags de Status entre Colchetes:** Adicionar tags como , , [FINAL] ou `` permite que qualquer pessoa identifique o estágio do arquivo sem precisar abri-lo.[1] Isso resolve o problema de múltiplas versões circulando simultaneamente.
4. **Versioning (v01, v02, v03):** O uso de zeros à esquerda (v01 em vez de v1) garante que o sistema de ordenação não coloque a "v10" logo após a "v1".[14, 15, 16]
   | Nome Incorreto | Nome Ideal (Padrão Enterprise) | Razão da Mudança |
   | ------ | ------ | ------ |
   | logo\_final.png | 2025-01-10\_ClienteX\_Branding\_Logo-Principal\_FINAL\_v01.png | Identifica data, cliente, propósito e status final. |
   | rascunho\_blog.docx | 2025-03-30\_Agencia\_Blog\_IA-no-Marketing\_DRAFT\_v02.docx | Permite saber o tema e que ainda é um rascunho. |
   | video\_campanha.mp4 | 2025-02-15\_ClienteY\_Promo-Verao\_Video-15s\_REVIEW\_v04.mp4 | Especifica o formato (15s) e que está em revisão. |

Para campanhas de mídia paga, a nomenclatura se torna ainda mais técnica, incorporando elementos de segmentação de audiência e plataforma (ex: FB\_Conversion\_Lookalike\_25-45), o que facilita a análise de dados automatizada.[17]

#### Fluxos de Trabalho para Conteúdo Multimídia e Vídeo

Agências que produzem grandes volumes de vídeo e design enfrentam o desafio do tamanho dos arquivos e do controle de versões complexas.[10, 18] O Google Drive, embora versátil, pode se tornar lento se não houver uma distinção clara entre arquivos de projeto e entregas.[19]

##### Gestão de Vídeo: Brutos vs. Editados

A recomendação das maiores empresas de marketing é a separação física de ativos brutos (RAW) e ativos editados.[10]

* **Pasta Raw Video:** Armazena filmagens originais, capturas de áudio e cartões de memória descarregados. Esta pasta raramente é compartilhada com o cliente e serve como o cofre de segurança do material original.[10]
* **Pasta Edited Video:** Contém as sequências de edição, arquivos de projeto (Premiere, After Effects) e, crucialmente, uma subpasta de "Edições Anteriores" ou "Arquivo" para guardar versões descartadas sem poluir a visão principal.[1, 10]
  As agências que operam em alto nível frequentemente utilizam o Google Drive for Desktop. Isso permite que os editores de vídeo acessem os arquivos diretamente do Finder (Mac) ou Explorer (Windows) como se estivessem em um disco local, sem precisar baixar e subir arquivos manualmente via navegador.[19, 20]

##### Integração com Adobe Creative Cloud

A colaboração entre o Google Drive e as ferramentas Adobe (Photoshop, Illustrator) é um ponto crítico. As grandes agências utilizam as "Creative Cloud Libraries" para gerenciar elementos gráficos menores (cores, ícones, logos) que precisam estar em sincronia entre o designer e o profissional de marketing que monta apresentações no Google Slides.[21, 22]
| Ativo | Armazenamento Recomendado | Ferramenta de Acesso |
| ------ | ------ | ------ |
| Arquivos de Projeto Pesados (PSD, AE, PRPROJ) | Shared Drive (acesso via Desktop Sync) | Adobe Creative Cloud Desktop |
| Ativos de Marca (Logos, Cores, Tipografia) | CC Libraries + Shared Drive | Painel Library da Adobe + Add-on Google Workspace |
| Documentos de Estratégia e Copy | Google Drive (Docs/Sheets) | Navegador Web |
| Entregas Finais para Cliente | Shared Drive (Pasta "Final") ou Portal DAM | Link de Visualização / Download |

Para agências globais, a integração vai além do arquivo. A Omnicom, por exemplo, utiliza o Microsoft Dynamics AX para padronizar processos financeiros e operacionais, garantindo que cada arquivo de projeto no Drive esteja vinculado a uma ordem de trabalho no sistema de gestão de recursos.[23]

#### Automação, Espelhamento e o Ecossistema de Ferramentas

O "cenário ideal" de pastas não termina no Google Drive; ele se integra a outras plataformas.[7, 10] Uma prática comum em agências de alta performance é o "espelhamento de estrutura".[10]

##### Espelhamento Drive-HubSpot-Project Management

Se uma agência utiliza o HubSpot para automação de marketing e o Notion ou Asana para gestão de projetos, a estrutura de pastas do Google Drive deve ser uma réplica exata das pastas nessas outras ferramentas.[7, 10]

* **Mecanismo:** Se um projeto é criado no Notion sob o código "PRJ-2025-001", deve existir uma pasta correspondente no Google Drive com o mesmo código.
* **Vantagem:** Isso elimina a dúvida de "onde guardar" ou "onde procurar". Se o profissional está no HubSpot trabalhando em um blog post, ele sabe que o arquivo de vídeo correspondente está em uma pasta com o exato mesmo nome no Drive.[10]
  A automação desempenha um papel fundamental aqui. Através de ferramentas como Zapier, Make ou scripts personalizados de Google Apps Script, as maiores agências automatizam a criação de estruturas de pastas. Quando um negócio é marcado como "Fechado" no CRM, o sistema cria automaticamente o Shared Drive do cliente com todas as subpastas padronizadas e convida os membros do time com base em seus papéis.[7, 11]

#### Governança de Acessos e Colaboração Externa

A segurança é o componente que diferencia uma organização amadora de uma de nível corporativo.[8] O compartilhamento indiscriminado de pastas é um dos maiores riscos de vazamento de dados e perda de propriedade intelectual.[8, 9]

##### A Regra de Ouro das Permissões

As maiores agências seguem o princípio do "menor privilégio necessário". Ninguém deve ter acesso de "Editor" se apenas precisar ler o documento.[8]

1. **Leitor (Viewer):** Ideal para clientes na fase de entrega final ou colaboradores de outros departamentos que precisam apenas consultar referências.[1, 8, 24]
2. **Comentarista (Commenter):** O nível ideal para feedback. Permite que o cliente ou o diretor criativo sugira alterações sem o risco de deletar conteúdo ou desformatar o arquivo.[1, 8, 24]
3. **Editor:** Reservado apenas para quem está ativamente produzindo o conteúdo.[8]
4. **Administrador de Conteúdo (Content Manager):** Nível exclusivo para Shared Drives, permitindo mover e organizar arquivos, mas sem a capacidade de deletar o drive ou alterar configurações de segurança.[6]
   Para gerenciar freelancers, a prática recomendada é nunca dar acesso ao drive principal da conta. Em vez disso, cria-se uma pasta de "Intercâmbio" ou um Shared Drive temporário onde o freelancer deposita seu trabalho e o time interno o move para a estrutura principal após a revisão.[1, 9]

##### Auditorias e Limpeza de Acessos

Agências de grande porte realizam auditorias de segurança periódicas, frequentemente utilizando ferramentas como o GAT+ ou o Google Vault para identificar arquivos compartilhados com domínios externos ou contas pessoais (@gmail.com) que não deveriam ter acesso.[8] O desligamento de um colaborador deve disparar um processo imediato de revogação de acessos, algo simplificado pelo uso de Google Groups.[6, 8]

#### A Transição para o Digital Asset Management (DAM)

Para muitas empresas, o Google Drive acaba se tornando pequeno para suas necessidades, não em termos de espaço, mas de funcionalidade.[12, 25] Quando uma agência atinge um volume superior a 10.000 ativos digitais, a estrutura de pastas começa a falhar, não importa quão organizada seja.[12] É neste ponto que as maiores empresas migram para soluções de Digital Asset Management (DAM), como Canto, Bynder ou Adobe Experience Manager.[18, 19, 25]

##### Por que o DAM é o Próximo Passo?

O DAM não organiza por pastas, mas por metadados. Em vez de procurar em Cliente > 2025 > Campanha > Social > Video, o usuário simplesmente pesquisa por "Vídeo, Cliente X, Ator Y, Campanha de Verão, Direitos de Uso Ativos".[12, 18, 26]
| Funcionalidade | Google Drive | Digital Asset Management (DAM) |
| ------ | ------ | ------ |
| Organização Primária | Pastas e Subpastas | Metadados e Tags |
| Busca | Nome do arquivo e OCR básico | Campos de metadados estruturados e IA visual |
| Direitos Autorais (DRM) | Manual (em documentos separados) | Alertas automáticos de expiração de licença |
| Revisão e Aprovação | Comentários em documentos | Fluxos de aprovação com selos de tempo (time-stamped) |
| Conversão de Arquivos | Manual (baixar, converter, subir) | Automática (exportar em diferentes formatos na hora) |

As holdings de publicidade, como a Omnicom, já integram IA diretamente em seus ecossistemas de ativos.[4] O uso de plataformas como ArtBotAI permite que a agência crie e escale conteúdo personalizado de forma eficiente, utilizando uma base de ativos que já entra no sistema devidamente etiquetada e categorizada pela IA.[4]

#### A Regra 80/20 e a Cultura de Organização

Nenhum sistema de pastas sobreviverá sem uma cultura organizacional que o sustente.[1, 18] As agências que mantêm o cenário ideal aplicam a Regra 80/20: 80% do tempo e esforço organizacional devem ser gastos em ativos correntes e entregáveis aos clientes, enquanto 20% são dedicados à manutenção e arquivamento de materiais históricos.[1]

##### Treinamento e Standard Operating Procedures (SOPs)

A organização não pode ser um conhecimento tácito guardado na cabeça do gerente de operações; ela deve estar documentada em Procedimentos Operacionais Padrão (SOPs).[1, 7]

* **O Documento de Padrão:** Toda agência deve ter um Google Doc acessível a todos que detalha: "Como nomeamos arquivos", "Onde guardamos contratos" e "Quais as cores das pastas para cada status".[1]
* **Color Coding:** O Google Drive permite colorir pastas. Grandes agências utilizam isso para indicar prioridade ou status: Vermelho para prazos urgentes, Verde para aprovado, Cinza para arquivado.[1]
* **Onboarding:** Novos contratados devem passar por um treinamento obrigatório sobre a estrutura do Drive no primeiro dia. Isso reduz o tempo de rampa (ramp-up time) de meses para semanas, pois o novo colaborador sabe exatamente onde encontrar o que precisa para começar a produzir.[7]

#### Conclusões para a Implementação do Cenário Ideal

A busca pela melhor solução de pastas no Google Drive para empresas de marketing e publicidade revela que o sucesso reside na combinação de uma arquitetura rígida com processos automatizados de governança.[1, 2, 4] Não existe uma estrutura única que funcione para todos, mas os princípios de Shared Drives, fórmulas de nomenclatura cronológica e integração de ferramentas são universais entre as maiores agências do mundo.[6, 7, 14]
Para implementar o cenário ideal, a organização deve seguir uma trajetória clara:

1. **Centralização:** Migrar todos os ativos de contas pessoais e pastas isoladas para Shared Drives corporativos, garantindo a propriedade institucional.[6, 8]
2. **Padronização:** Criar um template de pastas para clientes e departamentos, garantindo que a estrutura seja idêntica em toda a organização.[2, 11]
3. **Linguagem Única:** Instituir uma política de nomenclatura baseada em datas ISO e tags de status, tornando a busca o método principal de navegação.[13, 14, 16]
4. **Automação:** Utilizar scripts e ferramentas de integração para que a criação de pastas e a gestão de acessos sejam subprodutos do fluxo de trabalho, e não tarefas extras.[7, 10, 11]
5. **Evolução:** Monitorar o crescimento do repositório e planejar a transição para um sistema de DAM quando a complexidade de metadados superar a capacidade de organização por pastas.[12, 18]
   Ao tratar a organização de arquivos como uma infraestrutura crítica — comparável ao financeiro ou ao jurídico —, as agências de marketing removem o atrito operacional, protegem seus dados e preparam o terreno para a próxima onda de inovação baseada em inteligência artificial, que dependerá inteiramente de dados bem estruturados para funcionar.[4, 7]

---

1. Google Drive Organization for Creators Guide | InfluenceFlow, <https://influenceflow.io/resources/google-drive-organization-for-creators-the-ultimate-guide-to-streamlined-content-management/>
2. How to Set up the Best Google Drive Folder System for Your Agency ..., <https://www.zenpilot.com/blog/google-drive-folder-organization-system-for-agencies>
3. WPP | Case study | anegis.com, <https://www.anegis.com/clients/wpp>
4. Case Study: How Omnicom Transforms Marketing with Innovation, Data, and Automation, <https://aiexpert.network/ai-at-omnicom/>
5. Data: Our Approach & Case Studies - WPP, <https://www.wpp.com/-/media/project/wpp/files/investors/2011/6-data.pdf>
6. Best practices and tips for shared drives - Google Workspace Learning Center, <https://support.google.com/a/users/answer/13015138?hl=en>
7. How I structure my agency's operations (I was drowning in Google Drive) - Reddit, <https://www.reddit.com/r/agency/comments/1rgjvjh/how_i_structure_my_agencys_operations_i_was/>
8. Google Drive Sharing & Permissions: Best Practices for Google Admins - GAT Labs, <https://gatlabs.com/blogpost/google-drive-permissions-best-practices/>
9. Manage external sharing for your organization - Google Workspace Help, <https://knowledge.workspace.google.com/admin/drive/manage-external-sharing-for-your-organization>
10. Creating Google Drive Folders for Marketing Content, <https://knowledge.agencyperformancepartners.com/knowledge/creating-google-drive-folders-for-marketing-content>
11. What is the best way to auto create a folder structure in google drive with docs generated from templates inside of them? Airtable +n8n? : r/gsuite - Reddit, <https://www.reddit.com/r/gsuite/comments/1j0fms9/what_is_the_best_way_to_auto_create_a_folder/>
12. If you work on an enterprise marketing team, how do you organize ..., <https://www.reddit.com/r/DigitalMarketing/comments/1rqu2yh/if_you_work_on_an_enterprise_marketing_team_how/>
13. File Naming Best Practices for Digital Asset Management | Acquia, <https://www.acquia.com/glossary/file-naming-conventions>
14. File Naming Conventions - Harvard Biomedical Data Management, <https://datamanagement.hms.harvard.edu/plan-design/file-naming-conventions>
15. File & Folder Naming Conventions - Sonoma County, <https://sonomacounty.gov/administrative-support-and-fiscal-services/information-systems/divisions/information-management/web-services/web-standards-and-guidelines/consistent-content-and-style/file-and-folder-naming-conventions>
16. Naming files and folders | Research | Imperial College London, <https://www.imperial.ac.uk/research-and-innovation/support-for-staff/scholarly-communication/research-data-management/organising-and-describing-data/naming-files-and-folders/>
17. Marketing Campaign Naming Conventions: Best Practices ..., <https://improvado.io/blog/marketing-campaign-naming-conventions>
18. Top 10 Digital Asset Management Best Practices | Canto, <https://www.canto.com/blog/top-digital-asset-management-best-practices/>
19. Adobe Experience Manager and Creative Cloud integration best practices, <https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/assets/manage/aem-cc-integration-best-practices>
20. How to Transfer Adobe Creative Cloud Files to Google Drive, <https://www.cloudduplicatefinder.com/blog/transfer-adobe-creative-cloud-files-to-google-drive/>
21. How to use Adobe Creative Cloud add-on for Google Workspace, <https://helpx.adobe.com/creative-cloud/help/creative-cloud-for-google-workplace.html>
22. Integrations between Adobe Creative Cloud and Google Workspace, <https://workspace.google.com/blog/product-announcements/integrations-between-adobe-creative-cloud-and-google-workspace>
23. Omnicom\_Group\_Case\_Study0.docx - Microsoft Download Center, <https://download.microsoft.com/documents/customerevidence/Files/4000008870/Omnicom_Group_Case_Study0.docx>
24. Google Tools for Freelancers: 5 Ways to Stay Organized Without Expensive Software, <https://andimaonah.medium.com/google-tools-for-freelancers-5-ways-to-stay-organized-without-expensive-software-222741b4bf40>
25. Stay organized: 10 best practices for digital asset management - Playbook, <https://www.playbook.com/blog/best-practices-for-digital-asset-management/>
26. 8 Important Digital Asset Management Best Practices for Success - PhotoShelter for Brands, <https://go.photoshelter.com/ask-photoshelter/8-important-digital-asset-management-best-practices-for-success/>
