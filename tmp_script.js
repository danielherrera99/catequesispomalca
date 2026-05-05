import fs from 'fs';

let code = fs.readFileSync('src/App.jsx', 'utf8');

const imports = [
  "import AnunciosList from './components/lists/AnunciosList';",
  "import ActasList from './components/lists/ActasList';",
  "import EventosList from './components/lists/EventosList';",
  "import FormacionList from './components/lists/FormacionList';",
  "import CantosList from './components/lists/CantosList';",
  "import ServiciosList from './components/lists/ServiciosList';",
  "import PeticionesList from './components/lists/PeticionesList';",
  "import GaleriaList from './components/lists/GaleriaList';",
  "import EspirituList from './components/lists/EspirituList';",
  "import DocumentosList from './components/lists/DocumentosList';"
].join('\n');

code = code.replace(/import EventosNewModal from '\.\/components\/EventosNewModal';/, "import EventosNewModal from './components/EventosNewModal';\n" + imports);

code = code.replace(/case 'Anuncios':\s*return renderAnuncios\(\);/, "case 'Anuncios': return <AnunciosList filteredData={filteredData} setReadItem={setReadItem} getTipoIcon={getTipoIcon} SafeImage={SafeImage} openEditModal={openEditModal} handleDelete={handleDelete} />;");
code = code.replace(/case 'Actas':\s*return renderActas\(\);/, "case 'Actas': return <ActasList filteredData={filteredData} getActaColor={getActaColor} formatSafeDate={formatSafeDate} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;");
code = code.replace(/case 'Eventos':\s*return renderEventos\(\);/, "case 'Eventos': return <EventosList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;");
code = code.replace(/case 'Servicios':\s*return renderServicios\(\);/, "case 'Servicios': return <ServiciosList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} handleParticipar={handleParticipar} />;");
code = code.replace(/case 'Peticiones':\s*return renderPeticiones\(\);/, "case 'Peticiones': return <PeticionesList filteredData={filteredData} handleOrar={handleOrar} openEditModal={openEditModal} handleDelete={handleDelete} />;");
code = code.replace(/case 'Formacion':\s*return renderFormacion\(\);/, "case 'Formacion': return <FormacionList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;");
code = code.replace(/case 'Cantos':\s*return renderCantos\(\);/, "case 'Cantos': return <CantosList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;");
code = code.replace(/case 'Documentos':\s*return renderDocumentos\(\);/, "case 'Documentos': return <DocumentosList filteredData={filteredData} setReadItem={setReadItem} openEditModal={openEditModal} handleDelete={handleDelete} />;");
code = code.replace(/case 'Galeria':\s*return renderGaleria\(\);/, "case 'Galeria': return <GaleriaList filteredData={filteredData} setReadItem={setReadItem} SafeImage={SafeImage} formatSafeDate={formatSafeDate} handleDelete={handleDelete} />;");
code = code.replace(/case 'Espiritu':\s*return renderEspiritu\(\);/, "case 'Espiritu': return <EspirituList filteredData={filteredData} espirituTab={espirituTab} setEspirituTab={setEspirituTab} openEditModal={openEditModal} handleDelete={handleDelete} />;");

fs.writeFileSync('src/App.jsx', code);
console.log('Done replacements');
