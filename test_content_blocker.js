// ===== TESTE DO SISTEMA DE BLOQUEIO SILENCIOSO =====
// Execute este script no console do navegador (F12)

console.log('🔧 TESTANDO SISTEMA DE BLOQUEIO SILENCIOSO');
console.log('==========================================');

// 1. Limpar dados anteriores
console.log('\n1. Limpando dados anteriores...');
localStorage.removeItem('locker:unlockedUntil');
localStorage.removeItem('locker:firstSeenAt');
localStorage.removeItem('contentBlocker_config');
console.log('✅ Dados limpos');

// 2. Verificar configuração atual
console.log('\n2. Verificando configuração atual...');
const currentConfig = {
  enabled: true,
  unlockTimeMinutes: 1 // 1 minuto para teste
};
console.log('📋 Configuração:', currentConfig);

// 3. Simular primeiro acesso
console.log('\n3. Simulando primeiro acesso...');
const now = Date.now();
localStorage.setItem('locker:firstSeenAt', now.toString());
console.log('⏰ Primeiro acesso registrado:', new Date(now).toLocaleTimeString());

// 4. Forçar reload do conteúdo
console.log('\n4. Forçando reload do sistema...');
window.dispatchEvent(new Event('forceContentReload'));

// 5. Verificar status após 2 segundos
setTimeout(() => {
  console.log('\n5. Verificando status do bloqueio...');
  
  const belowFoldElements = document.querySelectorAll('[class*="below"], [id*="below"], .content-section');
  const isBlocked = belowFoldElements.length === 0 || 
                   Array.from(belowFoldElements).some(el => 
                     el.style.display === 'none' || 
                     el.classList.contains('locked') ||
                     !el.offsetParent
                   );
  
  console.log('🔍 Elementos encontrados:', belowFoldElements.length);
  console.log('🔒 Status do bloqueio:', isBlocked ? 'ATIVO (conteúdo oculto)' : 'INATIVO (conteúdo visível)');
  
  if (isBlocked) {
    console.log('✅ TESTE PASSOU: Conteúdo está sendo bloqueado silenciosamente');
    console.log('⏳ Aguarde 1 minuto para ver o conteúdo ser liberado automaticamente');
  } else {
    console.log('❌ TESTE FALHOU: Conteúdo deveria estar bloqueado');
  }
  
  // 6. Mostrar dados do localStorage
  console.log('\n6. Dados do localStorage:');
  console.log('- locker:firstSeenAt:', localStorage.getItem('locker:firstSeenAt'));
  console.log('- locker:unlockedUntil:', localStorage.getItem('locker:unlockedUntil'));
  console.log('- contentBlocker_config:', localStorage.getItem('contentBlocker_config'));
  
}, 2000);

// 7. Teste de liberação forçada
console.log('\n7. Para testar liberação imediata, execute:');
console.log('   window.location.href = window.location.href + "?unlockNow=1"');

console.log('\n==========================================');
console.log('🎯 TESTE INICIADO - Aguarde os resultados...');