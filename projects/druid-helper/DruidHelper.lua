--[[
    ==========================================================
    Druid Helper - Painel Compacto de Barras (HUD)
    Versão 3.3.0 - Monitor Multi-Mob (Até 5 Inimigos Simultâneos)
    100% Livre de APIs bloqueadas pela Blizzard (Zero Taint / Zero Secret Errors)
    ==========================================================
--]]

local ADDON_NAME, DH = ...

-- ==========================================================
-- Proteção Anti-Secret Value (WoW Forever Engine)
-- ==========================================================
local function IsSecret(val)
    if val == nil then return false end
    if issecretvalue and issecretvalue(val) then return true end
    if canaccessvalue and not canaccessvalue(val) then return true end
    return false
end

local function SafeNum(val, fallback)
    if val == nil or IsSecret(val) or type(val) ~= "number" then
        return fallback or 0
    end
    return val
end

local function SafeStr(val, fallback)
    if val == nil or IsSecret(val) or type(val) ~= "string" then
        return fallback or ""
    end
    return val
end

-- ==========================================================
-- Configurações Padrão
-- ==========================================================
local defaults = {
    point = "CENTER",
    relativePoint = "CENTER",
    x = 0,
    y = -120,
    locked = false,
    scale = 1.0,
    alpha = 0.95,
    showSwing = true,
    showThreat = true,
    multiMob = true, -- true = até 5 mobs simultâneos; false = apenas o alvo atual
    showAllNearby = false, -- false = mostra o alvo atual + mobs em combate; true = mostra qualquer mob próximo com placa ativa
    clickToTarget = true, -- true = permite clicar na barra do mob para selecionar como alvo
    clickInCombat = false, -- true = mantém o clique ativo durante o combate
    soundAlerts = true,
}

local isInitialized = false
local isAutoAttacking = false
local trackedComboPoints = 0
local lastSoundTime = 0

local activeTimers = {
    faerieFire = 0,
    demoRoar = 0,
    rake = 0,
    rip = 0,
}

-- ==========================================================
-- Utilitários Simples e Seguros (Sem C_UnitAuras!)
-- ==========================================================
local function GetSpellNameSafe(spellID)
    if not spellID or IsSecret(spellID) then return nil end
    if C_Spell and C_Spell.GetSpellInfo then
        local ok, info = pcall(C_Spell.GetSpellInfo, spellID)
        if ok and info and not IsSecret(info.name) then
            return info.name
        end
    end
    if GetSpellInfo then
        local ok, name = pcall(GetSpellInfo, spellID)
        if ok and name and not IsSecret(name) then
            return name
        end
    end
    return nil
end

local function GetCurrentDruidForm()
    local form = GetShapeshiftForm and GetShapeshiftForm() or 0
    if IsSecret(form) then form = 0 end

    if form == 1 then
        return "BEAR"
    elseif form == 2 then
        return "AQUATIC"
    elseif form == 3 then
        return "CAT"
    elseif form == 4 then
        return "TRAVEL"
    elseif form == 5 then
        return "MOONKIN"
    end
    return "HUMANOID"
end

-- ==========================================================
-- Controle do Tempo do Ataque Básico (Swing Timer)
-- ==========================================================
local swingStart = 0
local swingDuration = 2.5
local isSwingActive = false
local maulQueued = false

local function GetFormAttackSpeed(form)
    if form == "CAT" then
        return 1.0
    elseif form == "BEAR" then
        return 2.5
    end
    local ok, speed = pcall(UnitAttackSpeed, "player")
    if ok and speed and not IsSecret(speed) and type(speed) == "number" and speed > 0 then
        return speed
    end
    return 2.5
end

local function ResetSwingTimer()
    local form = GetCurrentDruidForm()
    swingDuration = GetFormAttackSpeed(form)
    swingStart = GetTime()
    isSwingActive = true
end

-- ==========================================================
-- Construção da Interface Compacta (SOMENTE BARRAS)
-- ==========================================================
local backdropTemplate = BackdropTemplateMixin and "BackdropTemplate" or nil
local frame = CreateFrame("Frame", "DruidHelperFrame", UIParent, backdropTemplate)
frame:SetSize(240, 96)
frame:SetPoint("CENTER", 0, -120)
frame:SetMovable(true)
frame:EnableMouse(true)
frame:RegisterForDrag("LeftButton")
frame:SetClampedToScreen(true)
frame:SetFrameStrata("HIGH")

if frame.SetBackdrop then
    frame:SetBackdrop({
        bgFile = "Interface\\DialogFrame\\UI-DialogBox-Background-Dark",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        tile = true, tileSize = 16, edgeSize = 14,
        insets = { left = 3, right = 3, top = 3, bottom = 3 }
    })
    frame:SetBackdropColor(0.06, 0.06, 0.08, 0.95)
    frame:SetBackdropBorderColor(1.0, 0.49, 0.04, 0.95)
end

-- Movimentação Segura
frame.isMoving = false
local function StopMovingFrame(self)
    if self.isMoving then
        self.isMoving = false
        self:StopMovingOrSizing()
        local point, _, relPoint, x, y = self:GetPoint()
        if DruidHelperDB then
            DruidHelperDB.point = point
            DruidHelperDB.relativePoint = relPoint
            DruidHelperDB.x = math.floor(SafeNum(x, 0) + 0.5)
            DruidHelperDB.y = math.floor(SafeNum(y, -120) + 0.5)
        end
    end
end

frame:SetScript("OnDragStart", function(self)
    if not DruidHelperDB or not DruidHelperDB.locked then
        self.isMoving = true
        self:StartMoving()
    end
end)
frame:SetScript("OnDragStop", function(self) StopMovingFrame(self) end)
frame:SetScript("OnMouseUp", function(self, button)
    if button == "LeftButton" then StopMovingFrame(self) end
end)

-- Cabeçalho Compacto
local title = frame:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
title:SetPoint("TOPLEFT", frame, "TOPLEFT", 10, -6)
title:SetText("|cffFF7D0ADruid Helper|r")

local modeText = frame:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
modeText:SetPoint("TOPRIGHT", frame, "TOPRIGHT", -26, -6)
modeText:SetText("[Urso Tank]")

local configBtn = CreateFrame("Button", nil, frame)
configBtn:SetSize(16, 16)
configBtn:SetPoint("TOPRIGHT", frame, "TOPRIGHT", -6, -5)
configBtn:SetNormalTexture("Interface\\Buttons\\UI-OptionsButton")
configBtn:SetHighlightTexture("Interface\\Buttons\\UI-Common-MouseHilight")

-- BARRA 1: Recurso Principal (Raiva / Energia / Mana)
local powerBar = CreateFrame("StatusBar", nil, frame)
powerBar:SetSize(220, 15)
powerBar:SetPoint("TOPLEFT", frame, "TOPLEFT", 10, -24)
powerBar:SetStatusBarTexture("Interface\\TargetingFrame\\UI-StatusBar")
powerBar:SetStatusBarColor(0.85, 0.15, 0.15)
powerBar:SetMinMaxValues(0, 100)
powerBar:SetValue(0)

local powerBg = powerBar:CreateTexture(nil, "BACKGROUND")
powerBg:SetAllPoints(powerBar)
powerBg:SetTexture("Interface\\TargetingFrame\\UI-StatusBar")
powerBg:SetVertexColor(0.15, 0.05, 0.05, 0.7)

local powerText = powerBar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
powerText:SetPoint("CENTER", powerBar, "CENTER", 0, 0)
powerText:SetText("0 / 100")

-- BARRA 2: Tempo do Ataque Básico (Swing Timer)
local swingBar = CreateFrame("StatusBar", nil, frame)
swingBar:SetSize(220, 14)
swingBar:SetPoint("TOPLEFT", powerBar, "BOTTOMLEFT", 0, -4)
swingBar:SetStatusBarTexture("Interface\\TargetingFrame\\UI-StatusBar")
swingBar:SetStatusBarColor(0.2, 0.75, 1.0)
swingBar:SetMinMaxValues(0, 1)
swingBar:SetValue(0)

local swingBg = swingBar:CreateTexture(nil, "BACKGROUND")
swingBg:SetAllPoints(swingBar)
swingBg:SetTexture("Interface\\TargetingFrame\\UI-StatusBar")
swingBg:SetVertexColor(0.08, 0.15, 0.25, 0.7)

local swingText = swingBar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
swingText:SetPoint("CENTER", swingBar, "CENTER", 0, 0)
swingText:SetText("Ataque Básico: Pronto")

-- BARRA 3: Pontos de Combo (Gato)
local comboBar = CreateFrame("StatusBar", nil, frame)
comboBar:SetSize(220, 13)
comboBar:SetPoint("TOPLEFT", swingBar, "BOTTOMLEFT", 0, -4)
comboBar:SetStatusBarTexture("Interface\\TargetingFrame\\UI-StatusBar")
comboBar:SetStatusBarColor(0.95, 0.75, 0.1)
comboBar:SetMinMaxValues(0, 5)
comboBar:SetValue(0)

local comboBg = comboBar:CreateTexture(nil, "BACKGROUND")
comboBg:SetAllPoints(comboBar)
comboBg:SetTexture("Interface\\TargetingFrame\\UI-StatusBar")
comboBg:SetVertexColor(0.2, 0.15, 0.05, 0.7)

local comboText = comboBar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
comboText:SetPoint("CENTER", comboBar, "CENTER", 0, 0)
comboText:SetText("Pontos de Combo: 0 / 5")

-- Mini Badges no Rodapé
local badge1 = frame:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
badge1:SetPoint("BOTTOMLEFT", frame, "BOTTOMLEFT", 10, 7)
badge1:SetText("|cffFF4444FF: OFF|r")

local badge2 = frame:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
badge2:SetPoint("BOTTOM", frame, "BOTTOM", -10, 7)
badge2:SetText("|cffFF4444Demo: OFF|r")

local badge3 = frame:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
badge3:SetPoint("BOTTOMRIGHT", frame, "BOTTOMRIGHT", -10, 7)
badge3:SetText("|cff777777Auto: OFF|r")

-- ==========================================================
-- Painel Multi-Mob de Ameaça / Aggro (Até 5 Inimigos Simultâneos!)
-- ==========================================================
local MAX_ENEMY_BARS = 5

local threatFrame = CreateFrame("Frame", "DruidHelperThreatFrame", frame, backdropTemplate)
threatFrame:SetSize(240, 42)
threatFrame:SetPoint("TOP", frame, "BOTTOM", 0, -3)
threatFrame:SetFrameStrata("HIGH")

if threatFrame.SetBackdrop then
    threatFrame:SetBackdrop({
        bgFile = "Interface\\DialogFrame\\UI-DialogBox-Background-Dark",
        edgeFile = "Interface\\Tooltips\\UI-Tooltip-Border",
        tile = true, tileSize = 16, edgeSize = 12,
        insets = { left = 3, right = 3, top = 3, bottom = 3 }
    })
    threatFrame:SetBackdropColor(0.05, 0.05, 0.07, 0.92)
    threatFrame:SetBackdropBorderColor(0.8, 0.4, 0.1, 0.85)
end

local threatHeader = threatFrame:CreateFontString(nil, "OVERLAY", "GameFontNormalSmall")
threatHeader:SetPoint("TOPLEFT", threatFrame, "TOPLEFT", 10, -5)
threatHeader:SetText("|cffFFD100Ameaça / Aggro dos Inimigos|r")

local enemyBars = {}
for i = 1, MAX_ENEMY_BARS do
    local bar = CreateFrame("StatusBar", nil, threatFrame)
    bar:SetSize(220, 15)
    bar:SetPoint("TOPLEFT", threatFrame, "TOPLEFT", 10, -20 - ((i - 1) * 18))
    bar:SetStatusBarTexture("Interface\\TargetingFrame\\UI-StatusBar")
    bar:SetMinMaxValues(0, 100)
    bar:SetValue(100)

    local bg = bar:CreateTexture(nil, "BACKGROUND")
    bg:SetAllPoints(bar)
    bg:SetTexture("Interface\\TargetingFrame\\UI-StatusBar")
    bg:SetVertexColor(0.1, 0.1, 0.1, 0.75)

    local nameTxt = bar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    local statusTxt = bar:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")

    statusTxt:SetPoint("RIGHT", bar, "RIGHT", -4, 0)
    statusTxt:SetJustifyH("RIGHT")
    statusTxt:SetText("-")

    nameTxt:SetPoint("LEFT", bar, "LEFT", 4, 0)
    nameTxt:SetPoint("RIGHT", statusTxt, "LEFT", -6, 0)
    nameTxt:SetJustifyH("LEFT")
    if nameTxt.SetWordWrap then nameTxt:SetWordWrap(false) end
    nameTxt:SetText("-")

    local clickBtn = CreateFrame("Button", "DruidHelperEnemyBtn" .. i, bar, "SecureActionButtonTemplate")
    clickBtn:SetAllPoints(bar)
    clickBtn:RegisterForClicks("AnyUp")
    clickBtn:SetAttribute("type", "target")
    clickBtn:SetHighlightTexture("Interface\\QuestFrame\\UI-QuestTitleHighlight")

    enemyBars[i] = {
        bar = bar,
        name = nameTxt,
        status = statusTxt,
        btn = clickBtn,
    }
end

-- ==========================================================
-- Varredura Multi-Mob Segura (Usa UnitIsUnit para não depender de GUID secreto)
-- ==========================================================
local function ScanMultiEnemies(inCombat)
    local list = {}
    local addedTokens = {}

    local function IsDuplicateUnit(unitToken)
        for _, existingToken in ipairs(addedTokens) do
            local ok, same = pcall(UnitIsUnit, unitToken, existingToken)
            if ok and not IsSecret(same) and same then
                return true
            end
        end
        return false
    end

    local function TryAddUnit(unitToken, forceInclude)
        if #list >= MAX_ENEMY_BARS then return end

        pcall(function()
            if not UnitExists(unitToken) then return end
            if not UnitCanAttack("player", unitToken) then return end
            if UnitIsDead(unitToken) then return end
            if IsDuplicateUnit(unitToken) then return end

            local rawStatus = UnitThreatSituation("player", unitToken)
            local status = SafeNum(rawStatus, -1)
            local unitInCombat = UnitAffectingCombat(unitToken)
            if IsSecret(unitInCombat) then unitInCombat = true end

            local targetOfMob = unitToken .. "target"
            local hasMobTarget = UnitExists(targetOfMob)

            -- Inclui se for o alvo/foco direto, se estiver em combate, se tiver aggro, ou se a opção "Mostrar todos próximos" estiver ativa
            if forceInclude or unitInCombat or (rawStatus ~= nil) or hasMobTarget or DruidHelperDB.showAllNearby then
                table.insert(addedTokens, unitToken)

                local name = SafeStr(UnitName(unitToken), "Inimigo")
                local isCurrentTarget = false
                if UnitExists("target") then
                    local okT, sameT = pcall(UnitIsUnit, unitToken, "target")
                    if okT and not IsSecret(sameT) and sameT then
                        isCurrentTarget = true
                    end
                end

                local victimName = nil
                local mobTargetingPlayer = false
                if hasMobTarget then
                    victimName = SafeStr(UnitName(targetOfMob), nil)
                    local okP, sameP = pcall(UnitIsUnit, targetOfMob, "player")
                    if okP and not IsSecret(sameP) and sameP then
                        mobTargetingPlayer = true
                    end
                end

                -- Se o mob está batendo diretamente no player e o status veio vazio, considera tankando (3)
                if status < 0 then
                    status = mobTargetingPlayer and 3 or 0
                end

                table.insert(list, {
                    unit = unitToken,
                    name = name,
                    status = status,
                    isCurrentTarget = isCurrentTarget,
                    victimName = victimName,
                    mobTargetingPlayer = mobTargetingPlayer,
                    inCombat = unitInCombat or hasMobTarget,
                })
            end
        end)
    end

    -- 1. Alvo atual sempre tem prioridade
    TryAddUnit("target", true)

    -- Se o modo Multi-Mob estiver desabilitado nas configurações, para por aqui (mostra só 1 mob)
    if not DruidHelperDB.multiMob then
        return list
    end

    TryAddUnit("focus", true)

    -- 2. Alvos dos membros do grupo (em DG/Party pega os mobs mesmo sem nameplate!)
    for i = 1, 4 do
        TryAddUnit("party" .. i .. "target", false)
    end

    -- 3. Todos os Nameplates visíveis na tela (Tecla V ativa as placas no jogo)
    if C_NamePlate and C_NamePlate.GetNamePlates then
        local okNP, plates = pcall(C_NamePlate.GetNamePlates)
        if okNP and plates then
            for _, plate in ipairs(plates) do
                if plate and plate.namePlateUnitToken then
                    TryAddUnit(plate.namePlateUnitToken, false)
                end
            end
        end
    end
    for i = 1, 30 do
        TryAddUnit("nameplate" .. i, false)
    end

    return list
end

-- ==========================================================
-- Janela de Configurações In-Game (/dh config)
-- ==========================================================
local configPanel = CreateFrame("Frame", "DruidHelperConfigPanel", UIParent, backdropTemplate)
configPanel:SetSize(340, 365)
configPanel:SetPoint("CENTER", 0, 20)
configPanel:SetMovable(true)
configPanel:EnableMouse(true)
configPanel:RegisterForDrag("LeftButton")
configPanel:SetFrameStrata("DIALOG")
configPanel:Hide()

if configPanel.SetBackdrop then
    configPanel:SetBackdrop({
        bgFile = "Interface\\DialogFrame\\UI-DialogBox-Background-Dark",
        edgeFile = "Interface\\DialogFrame\\UI-DialogBox-Border",
        tile = true, tileSize = 24, edgeSize = 20,
        insets = { left = 4, right = 4, top = 4, bottom = 4 }
    })
    configPanel:SetBackdropColor(0.08, 0.08, 0.1, 0.98)
end

configPanel:SetScript("OnDragStart", configPanel.StartMoving)
configPanel:SetScript("OnDragStop", configPanel.StopMovingOrSizing)

local cfgTitle = configPanel:CreateFontString(nil, "OVERLAY", "GameFontHighlightLarge")
cfgTitle:SetPoint("TOP", configPanel, "TOP", 0, -14)
cfgTitle:SetText("|cffFF7D0ADruid Helper|r - Configurações")

local closeBtn = CreateFrame("Button", nil, configPanel, "UIPanelCloseButton")
closeBtn:SetPoint("TOPRIGHT", configPanel, "TOPRIGHT", -5, -5)

local alphaSlider = CreateFrame("Slider", "DHAlphaSlider", configPanel, "OptionsSliderTemplate")
alphaSlider:SetPoint("TOPLEFT", configPanel, "TOPLEFT", 30, -50)
alphaSlider:SetSize(250, 16)
alphaSlider:SetMinMaxValues(0.3, 1.0)
alphaSlider:SetValueStep(0.05)
DHAlphaSliderText:SetText("Opacidade da Janela")
DHAlphaSliderLow:SetText("30%")
DHAlphaSliderHigh:SetText("100%")
alphaSlider:SetScript("OnValueChanged", function(self, val)
    val = math.floor(SafeNum(val, 0.95) * 100) / 100
    DruidHelperDB.alpha = val
    frame:SetAlpha(val)
    threatFrame:SetAlpha(val)
end)

local scaleSlider = CreateFrame("Slider", "DHScaleSlider", configPanel, "OptionsSliderTemplate")
scaleSlider:SetPoint("TOPLEFT", alphaSlider, "BOTTOMLEFT", 0, -28)
scaleSlider:SetSize(250, 16)
scaleSlider:SetMinMaxValues(0.7, 1.5)
scaleSlider:SetValueStep(0.05)
DHScaleSliderText:SetText("Tamanho da Interface (Escala)")
DHScaleSliderLow:SetText("70%")
DHScaleSliderHigh:SetText("150%")
scaleSlider:SetScript("OnValueChanged", function(self, val)
    val = math.floor(SafeNum(val, 1.0) * 100) / 100
    DruidHelperDB.scale = val
    frame:SetScale(val)
end)

local function ApplyClickConfig()
    if InCombatLockdown and InCombatLockdown() then return end
    for i = 1, MAX_ENEMY_BARS do
        local btn = enemyBars[i].btn
        if btn then
            if not DruidHelperDB.clickToTarget then
                if UnregisterStateDriver then UnregisterStateDriver(btn, "visibility") end
                btn:Hide()
            elseif DruidHelperDB.clickInCombat then
                if UnregisterStateDriver then UnregisterStateDriver(btn, "visibility") end
                btn:Show()
            else
                if RegisterStateDriver then
                    RegisterStateDriver(btn, "visibility", "[combat] hide; show")
                else
                    btn:Show()
                end
            end
        end
    end
end

local function CreateCheck(name, labelText, yOffset, dbKey)
    local cb = CreateFrame("CheckButton", name, configPanel, "UICheckButtonTemplate")
    cb:SetPoint("TOPLEFT", scaleSlider, "BOTTOMLEFT", -5, yOffset)
    local text = cb:CreateFontString(nil, "OVERLAY", "GameFontHighlightSmall")
    text:SetPoint("LEFT", cb, "RIGHT", 4, 0)
    text:SetText(labelText)
    cb:SetScript("OnClick", function(self)
        local checked = self:GetChecked()
        DruidHelperDB[dbKey] = checked
        if dbKey == "multiMob" and checked then
            if GetCVar and GetCVar("nameplateShowEnemies") == "0" and SetCVar then
                SetCVar("nameplateShowEnemies", "1")
                print("|cffFF7D0ADruid Helper:|r Placas de inimigos (Tecla V) ativadas para o Multi-Mob funcionar!")
            end
        elseif dbKey == "clickToTarget" or dbKey == "clickInCombat" then
            if InCombatLockdown and InCombatLockdown() then
                print("|cffFF7D0ADruid Helper:|r A alteração do clique será aplicada assim que sair de combate.")
            else
                ApplyClickConfig()
            end
        end
    end)
    return cb
end

local checkThreat        = CreateCheck("DHCbThreat", "Mostrar painel de Ameaça / Aggro", -20, "showThreat")
local checkMultiMob      = CreateCheck("DHCbMultiMob", "Monitorar vários mobs simultâneos (Multi-Mob)", -45, "multiMob")
local checkAllMobs       = CreateCheck("DHCbAllMobs", "Listar mobs próximos mesmo fora de luta", -70, "showAllNearby")
local checkClickTarget   = CreateCheck("DHCbClickTarget", "Clicar no mob da lista para selecionar alvo", -95, "clickToTarget")
local checkClickCombat   = CreateCheck("DHCbClickCombat", "Permitir clique também durante o combate", -120, "clickInCombat")
local checkSwing         = CreateCheck("DHCbSwing", "Mostrar barra de Tempo do Ataque Básico", -145, "showSwing")
local checkSound         = CreateCheck("DHCbSound", "Alerta sonoro ao perder aggro em combate", -170, "soundAlerts")

local function ToggleConfigPanel()
    if configPanel:IsShown() then
        configPanel:Hide()
    else
        alphaSlider:SetValue(DruidHelperDB.alpha or 0.95)
        scaleSlider:SetValue(DruidHelperDB.scale or 1.0)
        checkThreat:SetChecked(DruidHelperDB.showThreat)
        checkMultiMob:SetChecked(DruidHelperDB.multiMob)
        checkAllMobs:SetChecked(DruidHelperDB.showAllNearby)
        checkClickTarget:SetChecked(DruidHelperDB.clickToTarget)
        checkClickCombat:SetChecked(DruidHelperDB.clickInCombat)
        checkSwing:SetChecked(DruidHelperDB.showSwing)
        checkSound:SetChecked(DruidHelperDB.soundAlerts)
        configPanel:Show()
    end
end

configBtn:SetScript("OnClick", ToggleConfigPanel)

-- ==========================================================
-- Atualização Principal das Barras
-- ==========================================================
local function UpdateResourceBar(form)
    pcall(function()
        if form == "BEAR" then
            modeText:SetText("|cffFF7D0A[Urso Tank]|r")
            powerBar:SetStatusBarColor(0.85, 0.15, 0.15)
            powerBg:SetVertexColor(0.2, 0.05, 0.05, 0.7)
            local cur = UnitPower("player", 1)
            local max = UnitPowerMax("player", 1)
            powerBar:SetMinMaxValues(0, max)
            powerBar:SetValue(cur)
            if not IsSecret(cur) and not IsSecret(max) then
                powerText:SetText(string.format("Raiva: %d / %d", cur or 0, max or 100))
            else
                powerText:SetFormattedText("Raiva: %d / %d", cur, max)
            end

        elseif form == "CAT" then
            modeText:SetText("|cffFFFF00[Gato DPS]|r")
            powerBar:SetStatusBarColor(1.0, 0.85, 0.1)
            powerBg:SetVertexColor(0.25, 0.2, 0.05, 0.7)
            local cur = UnitPower("player", 3)
            local max = UnitPowerMax("player", 3)
            powerBar:SetMinMaxValues(0, max)
            powerBar:SetValue(cur)
            if not IsSecret(cur) and not IsSecret(max) then
                powerText:SetText(string.format("Energia: %d / %d", cur or 0, max or 100))
            else
                powerText:SetFormattedText("Energia: %d / %d", cur, max)
            end

        else
            modeText:SetText("|cff00AAFF[Caster / Normal]|r")
            powerBar:SetStatusBarColor(0.15, 0.45, 0.95)
            powerBg:SetVertexColor(0.05, 0.1, 0.25, 0.7)
            local cur = UnitPower("player", 0)
            local max = UnitPowerMax("player", 0)
            powerBar:SetMinMaxValues(0, max)
            powerBar:SetValue(cur)
            if not IsSecret(cur) and not IsSecret(max) then
                powerText:SetText(string.format("Mana: %d / %d", cur or 0, max or 100))
            else
                powerText:SetFormattedText("Mana: %d / %d", cur, max)
            end
        end
    end)
end

local function UpdateHelperLogic()
    if not isInitialized then return end

    local inCombat = UnitAffectingCombat("player")
    local form = GetCurrentDruidForm()
    local hasTarget = UnitExists("target")
    local targetIsHostile = hasTarget and UnitCanAttack("player", "target") and not UnitIsDead("target")
    local now = GetTime()

    if inCombat and targetIsHostile and not isSwingActive then
        isAutoAttacking = true
        ResetSwingTimer()
    end

    if form == "CAT" then
        frame:SetHeight(98)
    else
        frame:SetHeight(82)
    end

    -- 1. Barra de Recurso (Raiva / Energia / Mana)
    UpdateResourceBar(form)

    -- 2. Barra do Tempo do Ataque Básico (Swing Timer)
    pcall(function()
        if not DruidHelperDB.showSwing then
            swingBar:Hide()
        else
            swingBar:Show()
            swingDuration = GetFormAttackSpeed(form)

            if isSwingActive then
                local elapsed = now - swingStart
                if elapsed >= swingDuration then
                    maulQueued = false
                    if isAutoAttacking or (inCombat and targetIsHostile) then
                        swingStart = now
                        elapsed = 0
                    else
                        isSwingActive = false
                        elapsed = swingDuration
                    end
                end

                local progress = math.min(1.0, math.max(0, elapsed / math.max(0.1, swingDuration)))
                local remTime = math.max(0, swingDuration - elapsed)
                swingBar:SetMinMaxValues(0, 1)
                swingBar:SetValue(progress)

                if form == "BEAR" and maulQueued then
                    swingBar:SetStatusBarColor(1.0, 0.65, 0.0)
                    swingText:SetText(string.format("MAUL ENGATILHADO: %.1fs", remTime))
                else
                    swingBar:SetStatusBarColor(0.2, 0.75, 1.0)
                    swingText:SetText(string.format("Ataque Básico: %.1fs / %.1fs", remTime, swingDuration))
                end
            else
                swingBar:SetMinMaxValues(0, 1)
                if form == "BEAR" and maulQueued then
                    swingBar:SetStatusBarColor(1.0, 0.65, 0.0)
                    swingBar:SetValue(1)
                    swingText:SetText("MAUL PRONTO NO PRÓXIMO GOLPE")
                else
                    swingBar:SetStatusBarColor(0.25, 0.35, 0.45)
                    swingBar:SetValue(1)
                    swingText:SetText(string.format("Ataque Básico: Pronto (%.1fs)", swingDuration))
                end
            end
        end
    end)

    -- 3. Barra de Pontos de Combo (Gato)
    pcall(function()
        if form == "CAT" then
            comboBar:Show()
            local apiCP = GetComboPoints and GetComboPoints("player", "target")
            if apiCP and not IsSecret(apiCP) then
                trackedComboPoints = apiCP
            end
            comboBar:SetMinMaxValues(0, 5)
            comboBar:SetValue(trackedComboPoints)
            if trackedComboPoints >= 4 then
                comboBar:SetStatusBarColor(1.0, 0.2, 0.2)
                comboText:SetText(string.format("|cffFF0000COMBO: %d / 5 (FINALIZAR!)|r", trackedComboPoints))
            else
                comboBar:SetStatusBarColor(0.95, 0.75, 0.1)
                comboText:SetText(string.format("Pontos de Combo: %d / 5", trackedComboPoints))
            end
        else
            comboBar:Hide()
        end
    end)

    -- 4. Badges de Status (FF, Demo/Rake, Auto)
    local hasFF = (activeTimers.faerieFire > now)
    local remFF = math.max(0, activeTimers.faerieFire - now)
    local hasDemo = (activeTimers.demoRoar > now)
    local remDemo = math.max(0, activeTimers.demoRoar - now)
    local hasRake = (activeTimers.rake > now)
    local remRake = math.max(0, activeTimers.rake - now)

    if hasFF then
        badge1:SetText(string.format("|cff00FF00FF: %ds|r", math.floor(remFF)))
    else
        badge1:SetText("|cffFF4444FF: OFF|r")
    end

    if form == "BEAR" then
        if hasDemo then
            badge2:SetText(string.format("|cff00FF00Demo: %ds|r", math.floor(remDemo)))
        else
            badge2:SetText("|cffFF4444Demo: OFF|r")
        end
    elseif form == "CAT" then
        if hasRake then
            badge2:SetText(string.format("|cff00FF00Rake: %ds|r", math.floor(remRake)))
        else
            badge2:SetText(string.format("|cffFFD100CP: %d/5|r", trackedComboPoints))
        end
    else
        badge2:SetText("|cff00AAFFNormal|r")
    end

    if isAutoAttacking or (inCombat and targetIsHostile) then
        badge3:SetText("|cff00FF00Auto: ON|r")
    else
        badge3:SetText("|cff777777Auto: OFF|r")
    end

    -- 5. Painel Multi-Mob de Ameaça / Aggro (Até 5 Inimigos!)
    pcall(function()
        if not DruidHelperDB.showThreat then
            threatFrame:Hide()
            return
        end

        local enemies = ScanMultiEnemies(inCombat)
        local count = #enemies

        if count > 0 then
            threatFrame:Show()
            -- Ajusta a altura da caixa dinamicamente conforme o número de mobs (1 a 5)
            threatFrame:SetHeight(26 + (count * 18))
            threatHeader:SetText(string.format("|cffFFD100Ameaça / Inimigos (%d)|r", count))

            local lostAggroDetected = false

            local inLockdown = InCombatLockdown and InCombatLockdown()

            for i = 1, MAX_ENEMY_BARS do
                local e = enemies[i]
                local row = enemyBars[i]
                if e then
                    row.bar:Show()

                    if not inLockdown and row.btn and DruidHelperDB.clickToTarget then
                        row.btn:SetAttribute("unit", e.unit)
                    end

                    local label = e.name
                    if e.isCurrentTarget then
                        label = "|cffFFFF00>> " .. label .. "|r"
                    end
                    row.name:SetText(label)

                    if e.status >= 3 or e.mobTargetingPlayer then
                        row.bar:SetStatusBarColor(0.1, 0.85, 0.2) -- Verde Seguro
                        row.bar:SetValue(100)
                        row.status:SetText("|cff00FF00100% SEGURO|r")
                    elseif e.status == 2 then
                        row.bar:SetStatusBarColor(1.0, 0.7, 0.1) -- Amarelo Alerta
                        row.bar:SetValue(75)
                        row.status:SetText("|cffFFD100ALERTA|r")
                    else
                        row.bar:SetStatusBarColor(0.9, 0.15, 0.15) -- Vermelho Solto
                        row.bar:SetValue(30)
                        if e.inCombat or inCombat then
                            local victim = (e.victimName and e.victimName ~= "") and (" -> " .. e.victimName) or " SOLTO!"
                            row.status:SetText("|cffFF3333SEM AGGRO" .. victim .. "|r")
                            lostAggroDetected = true
                        else
                            row.status:SetText("|cffAAAAAAFora de Luta|r")
                        end
                    end
                else
                    row.bar:Hide()
                    if not inLockdown and row.btn then
                        row.btn:SetAttribute("unit", nil)
                    end
                end
            end

            -- Alerta sonoro se estiver de Urso em combate e perder aggro de algum mob
            if lostAggroDetected and form == "BEAR" and inCombat and DruidHelperDB.soundAlerts then
                if (now - lastSoundTime) > 4.0 then
                    lastSoundTime = now
                    pcall(PlaySound, 8959)
                end
            end
        else
            threatFrame:Hide()
        end
    end)
end

-- ==========================================================
-- Detector Instantâneo de Magias Lançadas pelo Jogador
-- ==========================================================
local function OnPlayerSpellCast(spellID)
    if not spellID or IsSecret(spellID) then return end
    local castName = GetSpellNameSafe(spellID)
    if not castName then return end

    local now = GetTime()
    local lowerName = castName:lower()

    if spellID == 770 or spellID == 16857 or lowerName:find("feérico") or lowerName:find("faerie") then
        activeTimers.faerieFire = now + 40
    elseif spellID == 99 or spellID == 1735 or lowerName:find("desmoralizante") or lowerName:find("demoralizing") then
        activeTimers.demoRoar = now + 30
    elseif spellID == 1082 or lowerName:find("garra") or lowerName:find("claw") then
        isAutoAttacking = true
        if not isSwingActive then ResetSwingTimer() end
        trackedComboPoints = math.min(5, trackedComboPoints + 1)
    elseif spellID == 1822 or lowerName:find("estraçalhar") or lowerName:find("rake") then
        isAutoAttacking = true
        if not isSwingActive then ResetSwingTimer() end
        activeTimers.rake = now + 9
        trackedComboPoints = math.min(5, trackedComboPoints + 1)
    elseif spellID == 1079 or lowerName:find("rasgar") or lowerName:find("rip") then
        activeTimers.rip = now + 12
        trackedComboPoints = 0
    elseif spellID == 22568 or lowerName:find("mordida") or lowerName:find("ferocious") then
        trackedComboPoints = 0
    elseif spellID == 6807 or lowerName:find("espancar") or lowerName:find("maul") then
        isAutoAttacking = true
        maulQueued = false
        ResetSwingTimer()
    end

    if isInitialized then
        pcall(UpdateHelperLogic)
    end
end

-- ==========================================================
-- Registro de Eventos Oficiais Seguros
-- ==========================================================
local eventFrame = CreateFrame("Frame")
eventFrame:RegisterEvent("ADDON_LOADED")
eventFrame:RegisterEvent("PLAYER_LOGIN")
eventFrame:RegisterEvent("UNIT_SPELLCAST_SUCCEEDED")
eventFrame:RegisterEvent("UNIT_SPELLCAST_SENT")
eventFrame:RegisterEvent("PLAYER_ENTER_COMBAT")
eventFrame:RegisterEvent("PLAYER_LEAVE_COMBAT")
eventFrame:RegisterEvent("START_AUTOREPEAT_SPELL")
eventFrame:RegisterEvent("STOP_AUTOREPEAT_SPELL")
eventFrame:RegisterEvent("PLAYER_TARGET_CHANGED")
eventFrame:RegisterEvent("UPDATE_SHAPESHIFT_FORM")
eventFrame:RegisterEvent("NAME_PLATE_UNIT_ADDED")
eventFrame:RegisterEvent("NAME_PLATE_UNIT_REMOVED")
eventFrame:RegisterEvent("PLAYER_REGEN_ENABLED")

local function TryInitialize()
    if isInitialized then return end

    local _, playerClass = UnitClass("player")
    if not playerClass or IsSecret(playerClass) then return end

    if playerClass ~= "DRUID" then
        frame:Hide()
        threatFrame:Hide()
        return
    end

    isInitialized = true

    DruidHelperDB = DruidHelperDB or {}
    for k, v in pairs(defaults) do
        if DruidHelperDB[k] == nil then DruidHelperDB[k] = v end
    end

    frame:ClearAllPoints()
    frame:SetPoint(DruidHelperDB.point, UIParent, DruidHelperDB.relativePoint, DruidHelperDB.x, DruidHelperDB.y)
    frame:SetScale(DruidHelperDB.scale or 1.0)
    frame:SetAlpha(DruidHelperDB.alpha or 0.95)
    frame:Show()

    ApplyClickConfig()
    print("|cffFF7D0ADruid Helper v3.4|r (Multi-Mob Clicável) carregado! Digite |cffFFFF00/dh config|r para opções.")
    pcall(UpdateHelperLogic)
end

eventFrame:SetScript("OnEvent", function(self, event, arg1, arg2, arg3, arg4)
    if event == "ADDON_LOADED" and arg1 == ADDON_NAME then
        pcall(TryInitialize)
    elseif event == "PLAYER_LOGIN" then
        pcall(TryInitialize)
    elseif event == "UNIT_SPELLCAST_SENT" and arg1 == "player" then
        local spellID = arg4
        if spellID and not IsSecret(spellID) then
            local name = GetSpellNameSafe(spellID)
            if spellID == 6807 or (name and (name:lower():find("espancar") or name:lower():find("maul"))) then
                maulQueued = true
            end
        end
    elseif event == "UNIT_SPELLCAST_SUCCEEDED" and arg1 == "player" then
        pcall(OnPlayerSpellCast, arg3)
    elseif event == "PLAYER_ENTER_COMBAT" or event == "START_AUTOREPEAT_SPELL" then
        isAutoAttacking = true
        ResetSwingTimer()
        if isInitialized then pcall(UpdateHelperLogic) end
    elseif event == "PLAYER_LEAVE_COMBAT" or event == "STOP_AUTOREPEAT_SPELL" then
        isAutoAttacking = false
        isSwingActive = false
        maulQueued = false
        if isInitialized then pcall(UpdateHelperLogic) end
    elseif event == "PLAYER_TARGET_CHANGED" or event == "NAME_PLATE_UNIT_ADDED" or event == "NAME_PLATE_UNIT_REMOVED" then
        if event == "PLAYER_TARGET_CHANGED" then
            activeTimers.faerieFire = 0
            activeTimers.demoRoar = 0
            activeTimers.rake = 0
            activeTimers.rip = 0
            trackedComboPoints = 0
            if not UnitExists("target") or UnitIsDead("target") then
                isAutoAttacking = false
                isSwingActive = false
            end
        end
        if isInitialized then pcall(UpdateHelperLogic) end
    elseif event == "UPDATE_SHAPESHIFT_FORM" then
        maulQueued = false
        ResetSwingTimer()
        if isInitialized then pcall(UpdateHelperLogic) end
    elseif event == "PLAYER_REGEN_ENABLED" then
        if isInitialized then
            pcall(ApplyClickConfig)
            pcall(UpdateHelperLogic)
        end
    end
end)

local updateElapsed = 0
frame:SetScript("OnUpdate", function(self, elapsed)
    updateElapsed = updateElapsed + elapsed
    if updateElapsed >= 0.08 then
        updateElapsed = 0
        if isInitialized then
            pcall(UpdateHelperLogic)
        else
            pcall(TryInitialize)
        end
    end
end)

-- ==========================================================
-- Comandos de Barra (/dh)
-- ==========================================================
SLASH_DRUIDHELPER1 = "/dh"
SLASH_DRUIDHELPER2 = "/druidhelper"
SlashCmdList["DRUIDHELPER"] = function(msg)
    local raw = (msg or ""):gsub("^%s+", ""):gsub("%s+$", "")
    local cmd, arg = raw:match("^(%S+)%s*(.*)$")
    cmd = (cmd or ""):lower()

    if cmd == "config" or cmd == "options" or cmd == "opt" then
        ToggleConfigPanel()
    elseif cmd == "lock" or cmd == "travar" then
        DruidHelperDB.locked = true
        StopMovingFrame(frame)
        print("|cffFF7D0ADruid Helper:|r Painel travado.")
    elseif cmd == "unlock" or cmd == "destravar" or cmd == "mover" then
        DruidHelperDB.locked = false
        print("|cffFF7D0ADruid Helper:|r Painel destravado. Arraste e solte o mouse.")
    elseif cmd == "reset" then
        StopMovingFrame(frame)
        frame:ClearAllPoints()
        frame:SetPoint("CENTER", UIParent, "CENTER", 0, -120)
        frame:SetScale(1.0)
        frame:SetAlpha(0.95)
        DruidHelperDB.point = "CENTER"
        DruidHelperDB.relativePoint = "CENTER"
        DruidHelperDB.x = 0
        DruidHelperDB.y = -120
        DruidHelperDB.scale = 1.0
        DruidHelperDB.alpha = 0.95
        DruidHelperDB.locked = false
        frame:Show()
        print("|cffFF7D0ADruid Helper:|r Posição resetada ao centro da tela!")
    elseif cmd == "scale" and tonumber(arg) then
        local s = math.max(0.6, math.min(2.0, tonumber(arg)))
        DruidHelperDB.scale = s
        frame:SetScale(s)
        print(string.format("|cffFF7D0ADruid Helper:|r Escala alterada para %.1f.", s))
    else
        print("|cffFF7D0A--- Druid Helper Comandos ---|r")
        print("|cffFFFF00/dh config|r - Abre a janela de configurações (opacidade, tamanho, multi-mob).")
        print("|cffFFFF00/dh unlock|r - Destrava a janela para arrastar com o mouse.")
        print("|cffFFFF00/dh lock|r - Trava a janela na posição atual.")
        print("|cffFFFF00/dh reset|r - Devolve o painel para o centro da tela.")
    end
end
